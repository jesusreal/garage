class PaginationService {
	constructor ($filter, uiGridConstants) {
		this.totalRows = null;
		this.pageSize = 10;
		this.page = 1;
		this.totalPages = null;
		this.firstRow = null;
		this.lastRow = null;
    }

	changePage(pageToGo) {
		switch (pageToGo) {
			case 'next' :
				this.page += 1;
				break;
			case 'previous' :
				this.page -= 1;
				break;
		}

		this.setRowLimitsForPage();
	}

	setPaginationParams (totalRows) {
		this.amountOfVehicles = totalRows;	
		this.totalPages = Math.ceil(this.amountOfVehicles / this.pageSize);

		if ( this.page > this.totalPages ) {
		 	this.page = this.totalPages;
		}
		else if (this.page===0 && this.totalPages>0) {
			this.page = 1;
		}

		this.setRowLimitsForPage();
	}

	setRowLimitsForPage () {
		if ( this.page === 0) {
			this.firstRow = 0;
		} else {
			this.firstRow = 1 + ((this.page-1) * this.pageSize); 
		}

		if ( this.page >= this.totalPages ) {
		 	this.lastRow = this.amountOfVehicles;
		}
		else {
			this.lastRow = this.page * this.pageSize;
		}
	}

	getRowLimitsForPage () {
		return {first: this.firstRow, last: this.lastRow};
	}

	getRowLowerLimitForPage () {
		return this.firstRow;
	}

	getRowUpperLimitForPage () {
		return this.lastRow;
	}
	isFirstPage () {
		return (this.page <= 1);
	}

	isLastPage () {
		return (this.page === this.totalPages);
	}

	static factory () {
		return new PaginationService();
	}

}

export default PaginationService;
	
