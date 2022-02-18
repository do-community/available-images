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
            <table class="table">
                <thead>
                    <tr>
                        <th>Distribution</th>
                        <th>Version</th>
                        <th>Image Slug</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="filtered().length">
                        <tr v-for="image in filtered()" :key="image.id">
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
    </div>
</template>

<script>
    import i18n from '../../i18n';
    import data from '../../../build/distributions';

    const distributions = data.sort((a, b) => {
        if (a.distribution === b.distribution) {
            if (a.created_at === b.created_at) {
                return a.name < b.name;
            }
            return new Date(a.created_at) < new Date(b.created_at);
        }
        return a.distribution > b.distribution;
    });

    export default {
        name: 'Distributions',
        data() {
            return {
                i18n,
                filter: '',
            };
        },
        methods: {
            filterImage(image) {
                if (this.$data.filter.trim() === '') return true;

                const query = this.$data.filter.trim().toLowerCase();
                if (image.name && image.name.toLowerCase().includes(query)) return true;
                if (image.distribution && image.distribution.toLowerCase().includes(query)) return true;
                if (image.slug && image.slug.toLowerCase().includes(query)) return true;
                if (image.id && image.id.toString().includes(query)) return true;

                return false;
            },
            filtered() {
                return distributions.filter(this.filterImage);
            },
        },
    };
</script>
