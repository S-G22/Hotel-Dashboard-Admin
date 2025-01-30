hotelMod.controller("AdditonalServiceController",  function ($scope, SiteService) {
    
    function getQueryParam(hotelBookingId) {
        const urlParams = new URLSearchParams(window.location.search);
        console.log("urlParams", urlParams);
        return urlParams.get(hotelBookingId);
    }

    // Usage
    const hotelBookGid = getQueryParam('hotelBookingGuestId');


    //API
    $scope.GetEditServiceList = () => {

        SiteService.getHotelBookList(hotelBookGid)
            .then(function (response) {
                if (response.data.Message == "Success") {
                    $scope.hotelServiceList = response.data.listsData;
                }
                else {
                    alert("error")
                }
                (err) => {
                    alert(err)
                }
            })
    };

    $scope.GetEditServiceList();



    $scope.GetServiceList = () => {

        SiteService.getServiceList()
            .then(function (response) {
                if (response.data.Message == "Success") {

                    $scope.AllServices = response.data.serviceList;
                    console.log($scope.AllServices);
                }
                else {
                    alert("error");
                }
            },

                (err) => {
                    alert(err);
                    console.log(err);

                })
    };
    $scope.GetServiceList();





    $scope.GetAdditionalServiceList = () => {

        SiteService.getAdditionalServiceListData()
            .then(function (response) {
                if (response.data.Message == "Success") {
                  /*  $scope.AllServices = response.data.serviceList;*/
                    $scope.AllAdditionalServiceList = response.data.additionalBookingDetails;
                }
                else {
                    alert(response.data.Message);
                }
            },

                (err) => {
                    alert(err.data.Message);

                })
    };
    $scope.GetAdditionalServiceList();


    $scope.Submit = () => {

        var obj = {
            BookingGuestId: $scope.bgID,
            ServiceID: $scope.selectedService,
            Quantity: $scope.quantity,

        };

        SiteService.postAdditionalServiceListData(obj)
            .then((response) => {
                if (response.data.Message == "Success") {
                    toastr.success("Data Submitted Successfully");
                }
                else {
                    toastr.error(response.data.Message);
                }
            },

                (err) => {
                    toastr.error(err.data.Message);

                })
    };



    $scope.ediT = (x) => {
        $('#updateModal').modal('show');
        console.log("x===========",x);
        $scope.updatedAdditionalBookingDetailsID = x.ABDid;
       /* $scope.updatedBookingGuestId = x.BOOKINGGUESTID;*/
        $scope.updatedServiceID = x.sID;
        $scope.updatedQuantity = x.sQt;


    }
    $scope.Update = () => {
        var obj = {
            AdditionalBookingDetailsID: $scope.updatedAdditionalBookingDetailsID,
          /*  BookingGuestId: $scope.updatedBookingGuestId,*/
            ServiceID: $scope.updatedServiceID,
            Quantity: $scope.updatedQuantity,
        };

        SiteService.updateAdditionalServiceListData(obj)
            .then((response) => {
                if (response.data.Message == "Success")
                {
                    alert("Form Updated Successfullly!");
                     $scope.GetAdditionalServiceList();
                    $scope.GetEditServiceList();
                }
                else {
                    alert(response.data.Message);
                }
            },
                (error) => {
                    alert(error.data.Message);
                })
    };



    $scope.delete = (x) => {
        console.log("x=delete=>",x)
        $('#deleteModal').modal('show');
        $scope.deleteId = x.ABDid;
    };


    $scope.Delete = () => {
        var obj = {
            AdditionalBookingDetailsID: $scope.deleteId
        };

        SiteService.deleteAdditionalServiceListData(obj)
            .then((response) => {
                if (response.data.Message == "Success") {
                    alert("Record deleted Successfully!");
                    $scope.GetAdditionalServiceList();
                    $scope.GetEditServiceList();
                }
                else {
                    alert(response.data.Message);
                }
            },
                (error) => {
                    alert(error.data.Message);
                })

    };

});