import requester from '../requester';
import { SEARCH } from '@src/constants';
import { ISearchPostParams } from '@models/ISearch';

const { URL_API } = SEARCH;

const searchApi = {
  searchPostApi: (params: ISearchPostParams) => requester.get(`${URL_API.SEARCH_POST}?keyWord=${params.keyWord}`)
};

export default searchApi;
