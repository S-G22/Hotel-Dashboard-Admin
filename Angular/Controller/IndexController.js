hotelMod.controller("IndexController", function ($scope, SiteService) {

    //// Image setup
    //$scope.Image = {
    //    name: "Hotel Image",
    //    img: "/Content/pic1.jpg"
    //};

    // Initialize Dashboard stats
    $scope.Stats = {
        TotalBookings: 0,
        TotalServices: 0,
        TotalEmployees: 0
    };

    // Get dashboard stats from service
    $scope.getDashboardStats = () => {
        SiteService.getDashboardStats()
            .then(function (response) {
                if (response.data.Message === "Success") {
                    $scope.Stats.TotalBookings = response.data.TotalBookings;
                    $scope.Stats.TotalServices = response.data.TotalServices;
                    $scope.Stats.TotalEmployees = response.data.TotalEmployees;
                } else {
                    toastr.error(response.data.Message);
                }
            }, function (error) {
                toastr.error("Failed to fetch dashboard stats");
                console.error("Dashboard Error:", error);
            });
    };

    // Call it on load
    $scope.getDashboardStats();

});
