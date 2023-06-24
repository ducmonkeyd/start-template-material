export class ApiResponse {
    status: number;
    content: Object;
    errorMessage: string;
  }
  
  export class ApiListPaginResponse {
    status: number;
    content: ApiListingModel;
    errorMessage: string;
  }
  
  export class ApiListResponse {
    status: number;
    content: Array<any>;
    errorMessage: string;
  }
  
  export class PagingModel {
    pageCount: number;
    totalItemCount: number;
    pageNumber: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    isFirstPage: boolean;
    isLastPage: boolean;
    firstItemOnPage: number;
    lastItemOnPage: number;
  }
  export class ApiListingModel extends PagingModel {
    constructor() {
      super();
    }
    items: Array<any>;
  }
  
  export interface ApiError {
    status: number;
    errorMessage: string;
    message: string;
    error: string;
  }
  
  export interface ApiDescriptionError {
    status: number;
    error_description: string;
    error: string;
  }
  
  