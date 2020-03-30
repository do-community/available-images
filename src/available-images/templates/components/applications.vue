<template>
    <div class="table-container">
        <table class="table">
            <thead>
            <tr>
                <th>Application</th>
                <th>Image Slug</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="image in applications">
                <td>{{ image.name }}</td>
                <td>{{ image.slug }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import i18n from '../../i18n';
    import data from '../../../build/applications';

    const applications = data.sort((a, b) => {
        if (a.created_at === b.created_at) {
            if (a.name === b.name) {
                return a.distribution > b.distribution;
            }
            return a.name > b.name;
        }
        return new Date(a.created_at) < new Date(b.created_at);
    });

    export default {
        name: 'Applications',
        data() {
            return {
                i18n,
                applications,
            };
        },
    };
</script>
