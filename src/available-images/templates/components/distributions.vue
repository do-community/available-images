<template>
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
            <tr v-for="image in distributions">
                <td>{{ image.distribution }}</td>
                <td>{{ image.name }}</td>
                <td>{{ image.slug }}</td>
            </tr>
            </tbody>
        </table>
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
                distributions,
            };
        },
    };
</script>
