import { GetterTree } from 'vuex';
import { State } from '@/store/player/PlayerState';
import { RootState } from '@/store';

export enum GetterTypes {
  GET_AUTHENTICATION = 'isAuthenticated',
  GET_PLAYER_STATUS = 'isPlayer'
}

export type Getters = {
  [GetterTypes.GET_PLAYER_STATUS]: (state: State) => boolean
  //TODO: add queue and player getters
}

export const getters: GetterTree<State, RootState> & Getters = {
  isPlayer: state => state.playerState || false
};