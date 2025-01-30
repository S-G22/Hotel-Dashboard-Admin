hotelMod.controller("AllRoomController", function ($scope, SiteService) {


    $scope.currentPage = 1;
    $scope.pageSize = 10;


    $scope.GetRoomList = () => {

        SiteService.getAllRoomList()
            .then(function (response) {
                if (response.data.Message == "Success") {
                    $scope.allRoomList = response.data.ROOMlists;
                    console.log("$scope.allRoomList", $scope.allRoomList);
                }
                else {
                    alert(response.data.Message);
                }
            },
                (err) => {
                    alert(err.data.Message);

                })
    }

    $scope.GetRoomList();

});