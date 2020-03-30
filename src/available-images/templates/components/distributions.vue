<template>
    <div>
        <form autocomplete="on" @submit.prevent="">
            <div class="input-container">
                <label for="input_search" class="hidden">Search distributions</label>
                <i class="fas fa-search"></i>
                <input id="input_search"
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
                if (image.name.toLowerCase().includes(query)) return true;
                if (image.distribution.toLowerCase().includes(query)) return true;
                if (image.slug.toLowerCase().includes(query)) return true;
                if (image.id.toString().includes(query)) return true;

                return false;
            },
            filtered() {
                return distributions.filter(this.filterImage);
            },
        },
    };
</script>
