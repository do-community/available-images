<!--
Copyright 2022 DigitalOcean

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

<template>
    <div>
        <form autocomplete="on" @submit.prevent="">
            <div class="input-container">
                <label for="input_search" class="hidden">Search distributions</label>
                <i class="fas fa-search"></i>
                <input
                    id="input_search"
                    v-model="filter"
                    class="input"
                    type="text"
                    placeholder="Search distributions..."
                />
            </div>
        </form>

        <div class="table-container">
            <table v-if="grouped" class="table">
                <thead>
                    <tr>
                        <th v-for="distro in distributionGroups" :key="distro">
                            {{ distro }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="filtered.length">
                        <tr>
                            <td v-for="distro in distributionGroups" :key="distro">
                                <ul>
                                    <li v-for="image in filteredGroups[distro] || []" :key="image.id">
                                        {{ image.name }}
                                        <code v-if="showSlugs" class="slim">{{ image.slug || image.id }}</code>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    </template>
                    <tr v-else>
                        <td :colspan="distributionGroups.length">
                            Sorry, no images matched your search.
                        </td>
                    </tr>
                </tbody>
            </table>

            <table v-else class="table">
                <thead>
                    <tr>
                        <th>Distribution</th>
                        <th>Version</th>
                        <th>Image Slug</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="filtered.length">
                        <tr v-for="image in filtered" :key="image.id">
                            <td>{{ image.distribution }}</td>
                            <td>{{ image.name }}</td>
                            <td>{{ image.slug || image.id }}</td>
                        </tr>
                    </template>
                    <tr v-else>
                        <td colspan="3">
                            Sorry, no images matched your search.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <PrettyCheck v-if="grouped" v-model="showSlugs" tabindex="0" class="p-default p-curve p-fill p-icon" @keydown.enter="toggleShowSlugs" @keydown.space="toggleShowSlugs">
            <template #extra>
                <i class="icon fas fa-check"></i>
            </template>
            Show image API slugs
        </PrettyCheck>
    </div>
</template>

<script>
    import i18n from '../../i18n';
    import data from '../../../build/distributions';
    import PrettyCheck from 'do-vue/src/templates/pretty-checkbox-vue/pretty_check';

    const distributions = data.sort((a, b) => {
        if (a.distribution === b.distribution) {
            if (a.created_at === b.created_at) {
                return a.name < b.name;
            }
            return new Date(a.created_at) < new Date(b.created_at);
        }
        return a.distribution > b.distribution;
    });

    const distributionGroups = [...new Set(distributions.map(d => d.distribution))];

    export default {
        name: 'Distributions',
        components: {
            PrettyCheck,
        },
        props: {
            grouped: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                i18n,
                filter: '',
                distributionGroups,
                showSlugs: false,
            };
        },
        computed: {
            filtered() {
                return distributions.filter(this.filterImage);
            },
            filteredGroups() {
                return this.filtered.reduce((obj, image) => ({
                    ...obj,
                    [image.distribution]: [
                        ...(obj[image.distribution] || []),
                        image,
                    ],
                }), {});
            },
        },
        methods: {
            filterImage(image) {
                if (this.$data.filter.trim() === '') return true;

                const query = this.$data.filter.trim().toLowerCase();
                if (image.name && image.name.toLowerCase().includes(query)) return true;
                if (image.slug && image.slug.toLowerCase().includes(query)) return true;
                if (!image.slug && image.id && image.id.toString().includes(query)) return true;
                if (!this.grouped && image.distribution && image.distribution.toLowerCase().includes(query)) return true;

                return false;
            },
            toggleShowSlugs(evt) {
                evt.preventDefault();
                this.showSlugs = !this.showSlugs;
            },
        },
    };
</script>
