<!--
Copyright 2020 DigitalOcean

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
    <div class="all do-bulma">
        <div class="table-container">
            <Applications v-if="type === 'applications'"></Applications>
            <Distributions v-if="type === 'distributions'"></Distributions>
        </div>
    </div>
</template>

<script>
    import i18n from '../i18n';

    export default {
        name: 'App',
        data() {
            return {
                i18n,
                type: null,
            };
        },
        created() {
            this.$data.type = this.$root.$data.type;
        },
        components: {
            Applications: () => import('./components/applications'),
            Distributions: () => import('./components/distributions'),
        },
    };
</script>
