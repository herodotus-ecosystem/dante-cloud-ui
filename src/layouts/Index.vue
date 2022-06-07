<template>
	<q-layout view="lHr LpR lFr" class="bg-grey-1">
		<q-header elevated class="bg-white text-grey-8 q-pt-xs" height-hint="58" style="z-index: 0">
			<q-toolbar>
				<q-btn flat dense round @click="application.leftDrawer = !application.leftDrawer" icon="menu" />

				<h-app-breadcrumbs></h-app-breadcrumbs>

				<q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
					<q-icon :name="fabYoutube" color="red" size="28px" />
					<q-toolbar-title shrink class="text-weight-bold"> YouTube </q-toolbar-title>
				</q-btn>

				<q-space />

				<div class="q-gutter-sm row items-center no-wrap">
					<q-btn round dense flat color="grey-8" icon="video_call" v-if="$q.screen.gt.sm">
						<q-tooltip>Create a video or post</q-tooltip>
					</q-btn>
					<q-btn round dense flat color="grey-8" icon="apps" v-if="$q.screen.gt.sm">
						<q-tooltip>Apps</q-tooltip>
					</q-btn>
					<q-btn round dense flat color="grey-8" icon="message" v-if="$q.screen.gt.sm">
						<q-tooltip>Messages</q-tooltip>
					</q-btn>
					<q-btn round dense flat color="grey-8" icon="notifications">
						<q-badge color="red" text-color="white" floating> 2 </q-badge>
						<q-tooltip>Notifications</q-tooltip>
					</q-btn>
					<q-btn round dense flat color="grey-8" icon="settings" @click="application.rightDrawer = !application.rightDrawer">
						<q-tooltip>设置</q-tooltip>
					</q-btn>
					<q-btn round flat>
						<q-avatar size="26px">
							<img src="https://cdn.quasar.dev/img/boy-avatar.png" />
						</q-avatar>
						<q-tooltip>Account</q-tooltip>
					</q-btn>
				</div>
			</q-toolbar>
			<q-separator />

			<h-app-tabs-view></h-app-tabs-view>
		</q-header>

		<h-app-left-drawer></h-app-left-drawer>

		<h-app-right-drawer></h-app-right-drawer>

		<h-app-container></h-app-container>
	</q-layout>
</template>

<script lang="ts">
import { ref } from 'vue';
import { fabYoutube } from '@quasar/extras/fontawesome-v6';

import { RouteRecordRaw } from 'vue-router';

import { useRouteStore, useApplicationStore } from '/@/stores';

import { HAppTabsView, HAppBreadcrumbs } from './header';
import { HAppLeftDrawer, HAppRightDrawer } from './drawer';
import { HAppContainer } from './content';

export default {
	name: 'HDefaultLayout',

	components: {
		HAppContainer,
		HAppBreadcrumbs,
		HAppLeftDrawer,
		HAppRightDrawer,
		HAppTabsView,
	},

	setup() {
		const application = useApplicationStore();

		const leftDrawerOpen = ref(false);
		const rightDrawerOpen = ref(false);
		const routeStore = useRouteStore();
		const menuItems: Array<RouteRecordRaw> = routeStore.routes;
		const search = ref('');

		const toggleLeftDrawer = () => {
			leftDrawerOpen.value = !leftDrawerOpen.value;
		};

		const toggleRightDrawer = () => {
			rightDrawerOpen.value = !rightDrawerOpen.value;
		};

		return {
			application,
			leftDrawerOpen,
			rightDrawerOpen,
			toggleLeftDrawer,
			toggleRightDrawer,
			menuItems,
			tab: ref('mails'),
			fabYoutube,

			search,

			links1: [
				{ icon: 'home', text: 'Home' },
				{ icon: 'whatshot', text: 'Trending' },
				{ icon: 'subscriptions', text: 'Subscriptions' },
			],
			links2: [
				{ icon: 'folder', text: 'Library' },
				{ icon: 'restore', text: 'History' },
				{ icon: 'watch_later', text: 'Watch later' },
				{ icon: 'thumb_up_alt', text: 'Liked videos' },
			],
			links3: [
				{ icon: fabYoutube, text: 'YouTube Premium' },
				{ icon: 'local_movies', text: 'Movies & Shows' },
				{ icon: 'videogame_asset', text: 'Gaming' },
				{ icon: 'live_tv', text: 'Live' },
			],
			links4: [
				{ icon: 'settings', text: 'Settings' },
				{ icon: 'flag', text: 'Report history' },
				{ icon: 'help', text: 'Help' },
				{ icon: 'feedback', text: 'Send feedback' },
			],
			buttons1: [
				{ text: 'About' },
				{ text: 'Press' },
				{ text: 'Copyright' },
				{ text: 'Contact us' },
				{ text: 'Creators' },
				{ text: 'Advertise' },
				{ text: 'Developers' },
			],
			buttons2: [{ text: 'Terms' }, { text: 'Privacy' }, { text: 'Policy & Safety' }, { text: 'Test new features' }],
		};
	},
};
</script>
