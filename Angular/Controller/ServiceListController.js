hotelMod.controller("ServiceListController", function ($scope, SiteService) {
    $scope.GetServiceList = () => {

        SiteService.getServiceListData()
            .then(function (response) {
                if (response.data.Message == "Success") {
                    $scope.AllServiceList = response.data.serviceList;
                }
                else {
                    alert(response.data.Message);
                }
            },
                (err) => {
                    alert(err.data.Message);
                
            })
    }

    $scope.GetServiceList();



    $scope.Submit = () => {
        var obj = {
            ServicesName: $scope.sName,
            Descriptions: $scope.description,
            Price : $scope.price,
        }
        SiteService.PostServiceListData(obj)
            .then((response) => {
                if (response.data.Message == "Success") {
                    alert("Data is submitted successfully");
                    $scope.GetServiceList();
                }
                else {
                    alert(response.data.Message);
                }
            },
                (err) => {
                    alert(err.data.Message);
                
            })
    }



    $scope.edit = (x) => {
       /* $('#myModal').modal('show');*/
        $scope.updatedServiceid = x.SERVICEID;
        $scope.updatedServicename = x.SERVICENAME;
        $scope.updatedDescription = x.DESCRIPTIONS;
        $scope.updatedPrices = x.PRICE;


    }
    $scope.Update = () => {
        var obj = {
            ServiceID: $scope.updatedServiceid,
            ServicesName: $scope.updatedServicename,
            Descriptions: $scope.updatedDescription,
            Price: $scope.updatedPrices,
        };

        SiteService.UpdateServiceListData(obj)
            .then((response) => {
                if (response.data.Message == "Success") {
                    alert("Form Updated Successfullly!");
                    $scope.GetServiceList();
                }
                else {
                    alert(response.data.Message);
                }
            },
                (error) => {
                    alert(error.data.Message);
                })
    };




    $scope.deleteModal = (x) => {
        $('#deleteModal').modal('show');
        $scope.deleteId = x.SERVICEID;
    };


    $scope.Delete = () => {
        var obj = {
            ServiceID: $scope.deleteId
        };

        SiteService.DeleteServiceListData(obj)
            .then((response) => {
                if (response.data.Message == "Success") {
                    alert("Record deleted Successfully!");
                    $scope.GetServiceList();
                }
                else {
                    alert(response.data.Message);
                }
            },
                (error) => {
                    alert(error.data.Message);
                })

    };

})