(function (angular) {
    "use strict";

    angular
        .module("todoApp")
        .directive("todoPaginatedList", [todoPaginatedList])
        .directive("pagination", [pagination])
        .factory("DataTransfer", function () {
        var totalItems = 0;
        return {

            getTotalItems: function () {
                return totalItems;
            },
            setTotalItems: function (total) {
                totalItems = total;
            }
        }
    });

    /**
     * Directive definition function of 'todoPaginatedList'.
     * 
     * TODO: correctly parametrize scope (inherited? isolated? which properties?)
     * TODO: create appropriate functions (link? controller?) and scope bindings
     * TODO: make appropriate general directive configuration (support transclusion? replace content? EAC?)
     * 
     * @returns {} directive definition object
     */
    function todoPaginatedList() {
        var directive = {
            restrict: "E", // example setup as an element only
            templateUrl: "app/templates/todo.list.paginated.html",
            scope: {}, // example empty isolate scope
            controller: ["$scope", controller],
        };

        function controller($scope) { // example controller creating the scope bindings
            $scope.todos = [];
        };

        return directive;
    }

    /**
     * Directive definition function of 'pagination' directive.
     * 
     * TODO: make it a reusable component (i.e. usable by any list of objects not just the Models.Todo model)
     * TODO: correctly parametrize scope (inherited? isolated? which properties?)
     * TODO: create appropriate functions (link? controller?) and scope bindings
     * TODO: make appropriate general directive configuration (support transclusion? replace content? EAC?)
     * 
     * @returns {} directive definition object
     */
    function pagination() {
        var directive = {
            restrict: "E", 
            templateUrl: "app/templates/pagination.html",
            scope: {},
            controller: ["$scope", "$http", controller],
        };

        function controller($scope, $http) {
            $scope.ddl = {
                selectedOption: { name: "20" },
                options: [
                    { name: "10" },
                    { name: "20" },
                    { name: "30" },
                    { name: "all" }
                ]
            };

            $scope.pageNumber = {
                value: 1
            };

            $http.get($scope.$parent.url + "?pageNumber=1&itemsPerPage=20").then(response => {
                $scope.$parent.todos = response.data.data;
                $scope.totalItems = response.data.totalItems;
                $scope.totalPages = response.data.totalPages;
            });

            $scope.showPage = function (url, pageNumber, itemsPerPage) {
                $scope.pageNumber.value = isFinite(itemsPerPage) ? pageNumber : 1;
                
                $http.get(url + "?pageNumber=" + pageNumber + "&itemsPerPage=" + itemsPerPage)
                    .success(function (response) {
                        $scope.$parent.todos = response.data;
                        $scope.totalItems = response.totalItems;
                        $scope.totalPages = response.totalPages;
                    });
            };
        };

        return directive;
    }

})(angular);

