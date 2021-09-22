import { RepositoriesAction } from "../actions/repositoriesAction";
import { ActionTypeRepositories } from "../action-types/repositoriesActionTypes";

interface RepositoriesState {
  loading: boolean;
  error: string | null;
  data: string[];
}
const initialState = {
  loading: false,
  error: null,
  data: [],
};

const reducer = (
  state: RepositoriesState = initialState,
  action: RepositoriesAction
): RepositoriesState => {
  switch (action.type) {
    case ActionTypeRepositories.SEARCH_REPOSITORIES:
      return { loading: true, error: null, data: [] };
    case ActionTypeRepositories.SEARCH_REPOSITORIES_SUCCESS:
      return { loading: false, error: null, data: action.payload };

    case ActionTypeRepositories.SEARCH_REPOSITORIES_ERROR:
      return { loading: false, error: action.payload, data: [] };

    default:
      return state;
  }
};

export default reducer;
