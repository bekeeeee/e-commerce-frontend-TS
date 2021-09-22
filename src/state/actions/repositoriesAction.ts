import { ActionTypeRepositories } from "../action-types/repositoriesActionTypes";

interface SearchRepositoriesAction {
  type: ActionTypeRepositories.SEARCH_REPOSITORIES;
}
interface SearchRepositoriesSuccessAction {
  type: ActionTypeRepositories.SEARCH_REPOSITORIES_SUCCESS;
  payload: string[];
}
interface SearchRepositoriesErrorAction {
  type: ActionTypeRepositories.SEARCH_REPOSITORIES_ERROR;
  payload: string;
}

export type RepositoriesAction =
  | SearchRepositoriesAction
  | SearchRepositoriesSuccessAction
  | SearchRepositoriesErrorAction;
