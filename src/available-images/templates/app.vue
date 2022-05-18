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
    <div class="all do-bulma">
        <div class="table-container">
            <Applications v-if="type === 'applications'"></Applications>
            <Distributions v-if="type === 'distributions'" :grouped="grouped"></Distributions>
        </div>
    </div>
</template>

<script>
    import { defineAsyncComponent } from 'vue';
    import i18n from '../i18n';

    const Applications = defineAsyncComponent(() => import('./components/applications'));
    const Distributions = defineAsyncComponent(() => import('./components/distributions'));

    export default {
        name: 'App',
        components: {
            Applications,
            Distributions,
        },
        props: {
            type: {
                type: String,
                required: true,
            },
            grouped: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                i18n,
            };
        },
    };
</script>
