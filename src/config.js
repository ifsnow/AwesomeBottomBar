// @flow

import {
  BOTTOM_BAR_ITEM_ID,
} from '~/types';

export const bottomBarItems = [
  {
    id: BOTTOM_BAR_ITEM_ID.HOME,
    image: {
      normal: require('~/assets/tab_home.png'),
      active: require('~/assets/tab_home_active.png'),
    },
  },
  {
    id: BOTTOM_BAR_ITEM_ID.SEARCH,
    image: {
      normal: require('~/assets/tab_search.png'),
      active: require('~/assets/tab_search_active.png'),
    },
  },
  {
    id: BOTTOM_BAR_ITEM_ID.POST,
    image: {
      normal: require('~/assets/tab_post.png'),
      active: require('~/assets/tab_post_active.png'),
    },
  },
  {
    id: BOTTOM_BAR_ITEM_ID.LIKE,
    image: {
      normal: require('~/assets/tab_like.png'),
      active: require('~/assets/tab_like_active.png'),
    },
  },
  {
    id: BOTTOM_BAR_ITEM_ID.PROFILE,
    image: {
      normal: require('~/assets/tab_profile.png'),
      active: require('~/assets/tab_profile_active.png'),
    },
  },
];
