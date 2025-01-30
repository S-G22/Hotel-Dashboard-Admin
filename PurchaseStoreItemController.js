(function () {
    'use strict';

    angular
        .module('app')
        .controller('PurchaseStoreItemController', PurchaseStoreItemController);

    PurchaseStoreItemController.$inject = ["$scope", "adminService", "ConstantData", "Factory", "loadDataService"];

    function PurchaseStoreItemController($scope, adminService, ConstantData, Factory, loadDataService) {
        if (new Date() < new Date('2024', '02', '26')) {
            alert("This page has recently been updated. Users are advised to use it cautiously and report any bugs immediately to the admin.")
        }
        $scope.checkSysytemLogin();
        $scope.currentPage = 1;
        $scope.sizeOptions = Factory.SizeOptions;
        $scope.pageSize = $scope.sizeOptions[1];
        $scope.sort = function (key) {
            $scope.sortKey = key;
            $scope.reverse = !$scope.reverse;
        };
        $scope.Purchase = {};
        $scope.Purchase.BillDate = new Date();
        $scope.PurchaseStoreItem = {};
        $scope.StoreItem = {};
        $scope.PurchaseStoreItemList = [];
        $scope.SelectedStoreItem = {};
        $scope.Delete_forUpdate = false;
        $scope.During_Edit = false;
        $scope.Update_After_Delete = false;
        $scope.Move_to_PurchaseStoreItemList = true;


        $scope.getSupplierList = function () {
            $scope.dataLoading = true;
            adminService.getSupplierList(1, 2)
                .then(function (response) {
                    if (response.data.Message == 'Success') {
                        $scope.SupplierList = response.data.SupplierList;
                    } else {
                        toastr.error(response.data.Message);
                    }
                    $scope.dataLoading = false;
                }, function (err) {
                    toastr.error("Some error occured while fetching data");
                    $scope.dataLoading = false;
                })
        }
        $scope.getSupplierList();

        $scope.getGSTList = function () {
            $scope.dataLoading = true;
            adminService.getGSTList(1)
                .then(function (response) {
                    if (response.data.Message == 'Success') {
                        $scope.GSTList = response.data.GSTList;
                    } else {
                        toastr.error(response.data.Message);
                    }
                    $scope.dataLoading = false;
                }, function (err) {
                    toastr.error("Some error occured while fetching data");
                    $scope.dataLoading = false;
                })
        }
        $scope.getGSTList();


        //StoreItem
        $scope.getStoreItemList = function () {
            $scope.dataLoading = true;
            adminService.getStoreItemList(1)
                .then(function (response) {
                    if (response.data.Message == 'Success') {
                        $scope.StoreItemList = response.data.StoreItemList;
                    } else {
                        toastr.error(response.data.Message);
                        $scope.dataLoading = false;
                    }
                });
        }, function (err) {
            toastr.error("Some error occured while fetching data");
            $scope.dataLoading = false;
        }
        $scope.getStoreItemList();

        $scope.getUnitList = function () {
            $scope.dataLoading = true;
            adminService.getUnitList(1)
                .then(function (response) {
                    if (response.data.Message == 'Success') {
                        $scope.UnitList = response.data.UnitList;
                    } else {
                        toastr.error(response.data.Message);
                    }
                    $scope.dataLoading = false;
                }, function (err) {
                    toastr.error("Some error occured while fetching data");
                    $scope.dataLoading = false;
                })
        }
        $scope.getUnitList();

        $scope.getItemTypeList = function () {
            $scope.dataLoading = true;
            adminService.getItemTypeList(0)
                .then(function (response) {
                    if (response.data.Message == 'Success') {
                        $scope.ItemTypeList = response.data.ItemTypeList;
                    } else {
                        toastr.error(response.data.Message);
                    }
                    $scope.dataLoading = false;
                }, function (err) {
                    toastr.error("Some error occured while fetching data");
                    $scope.dataLoading = false;
                })
        }
        $scope.getItemTypeList();

        $scope.$watch('formStoreItem.$valid', function (value) {
            $scope.IsFormStoreItemValid = value;
        })

        $scope.afterStoreItemSelected = function (selected) {
            if (selected != undefined) {
                $scope.SelectedStoreItem = selected.originalObject;
            } else {
                $scope.SelectedStoreItem = {};
            }
        }

        $scope.resetStoreItemForm = function () {
            $scope.IsStoreItemSubmitted = false;
            $scope.StoreItem = {};
            $scope.formStoreItem.$setPristine();
            $scope.formStoreItem.$setUntouched();
        }

        $scope.newStoreItem = function () {
            $scope.resetStoreItemForm();
            $('#modal_new_StoreItem').modal('show');
        }

        $scope.saveStoreItem = function () {
            $scope.IsStoreItemSubmitted = true;
            if ($scope.IsFormStoreItemValid) {
                var StoreItemModel = {
                    StoreItemId: $scope.StoreItem.StoreItemId,
                    ItemName: $scope.StoreItem.ItemName,
                    ItemCode: $scope.StoreItem.ItemCode,
                    ItemTypeId: $scope.StoreItem.ItemTypeId,
                    UnitId: $scope.StoreItem.UnitId,
                    StoreItemStatus: 1,
                }
                $scope.dataLoading = true;
                adminService.saveStoreItem(StoreItemModel)
                    .then(function (response) {
                        if (response.data.Message == 'Success') {
                            toastr.success("New StoreItem Created Successfully.");
                            $scope.StoreItemList = response.data.StoreItemList;
                            var StoreItemId = response.data.StoreItemId;
                            for (var i = 0; i < $scope.StoreItemList.length; i++) {
                                if ($scope.StoreItemList[i].StoreItemId == StoreItemId) {
                                    $scope.SelectedStoreItem = $scope.StoreItemList[i];
                                    break;
                                }
                            }
                            $scope.$broadcast('angucomplete-alt:changeInput', 'StoreItemAnguComplete', $scope.SelectedStoreItem.SearchStoreItem);
                            $('#modal_new_StoreItem').modal('hide');
                        } else {
                            toastr.error(response.data.Message);
                        }
                        $scope.dataLoading = false;
                    }, function (err) {
                        toastr.error("Some error occured while fetching data");
                        $scope.dataLoading = false;
                    })

            } else {
                toastr.error("Fill all fields!", "Validation Error");
            }
        }


        //PurchaseStoreItem
        $scope.$watch('formPurchaseStoreItem.$valid', function (value) {
            $scope.IsFormPurchaseStoreItemValid = value;
        })

        $scope.resetPurchaseStoreItemForm = function () {
            $scope.IsPurchaseStoreItemSubmitted = false;
            $scope.PurchaseStoreItem = {};
            $scope.SelectedStoreItem = {};
            $scope.$broadcast('angucomplete-alt:clearInput', 'StoreItemAnguComplete');
            $scope.formPurchaseStoreItem.$setPristine();
            $scope.formPurchaseStoreItem.$setUntouched();
        }

        $scope.addPurchaseStoreItem = function () {
            $scope.IsPurchaseStoreItemSubmitted = true;
            if (!$scope.IsFormPurchaseStoreItemValid) {
                toastr.error("Fill all required fields.");
                return;
            }

            if ($scope.SelectedStoreItem.StoreItemId == null || $scope.SelectedStoreItem.StoreItemId == undefined) {
                toastr.error("No StoreItem is selected.");
                return;
            }

            for (var i = 0; i < $scope.PurchaseStoreItemList.length; i++) {
                if ($scope.PurchaseStoreItemList[i].StoreItemId == $scope.SelectedStoreItem.StoreItemId) {
                    toastr.error("This StoreItem is already added");
                    return;
                }
            }

            var PurchaseStoreItemModel = {
                StoreItemId: $scope.SelectedStoreItem.StoreItemId,
                SearchStoreItem: $scope.SelectedStoreItem.SearchStoreItem,
                UnitName: $scope.SelectedStoreItem.UnitName,
                Rate: $scope.PurchaseStoreItem.Rate,
                Quantity: $scope.PurchaseStoreItem.Quantity,
                DiscountAmount: $scope.PurchaseStoreItem.DiscountAmount,
                DiscountPercentage: $scope.PurchaseStoreItem.DiscountPercentage,
                TaxableAmount: $scope.PurchaseStoreItem.TaxableAmount,
                GSTId: $scope.PurchaseStoreItem.GSTId,
                CGSTAmount: $scope.PurchaseStoreItem.CGSTAmount,
                SGSTAmount: $scope.PurchaseStoreItem.SGSTAmount,
                IGSTAmount: $scope.PurchaseStoreItem.IGSTAmount,
                LineTotal: $scope.PurchaseStoreItem.LineTotal,
            }
            $scope.PurchaseStoreItemList.push(PurchaseStoreItemModel);
            $scope.calculateTotalandroundOffGrandTotal();
            $scope.resetPurchaseStoreItemForm();
        }

        $scope.deletePurchaseStoreItem = function (index) {
            $scope.PurchaseStoreItemList.splice(index, 1);
        }
        $scope.changeDiscountAmount = function (purchaseStoreItem) {
            purchaseStoreItem.DiscountPercentage = null;
            $scope.changePurchaseStoreItem(purchaseStoreItem);
        }
        $scope.changePurchaseStoreItem = function (purchaseStoreItem) {
            debugger
            if (purchaseStoreItem.DiscountAmount == null && purchaseStoreItem.DiscountPercentage == null)
                purchaseStoreItem.DiscountAmount = null;
            else if (purchaseStoreItem.DiscountAmount >= 0 && purchaseStoreItem.DiscountPercentage > 0)
                purchaseStoreItem.DiscountAmount = (purchaseStoreItem.Rate * purchaseStoreItem.Quantity * purchaseStoreItem.DiscountPercentage / 100);
            else if (purchaseStoreItem.DiscountAmount == null && purchaseStoreItem.DiscountPercentage >= 0)
                purchaseStoreItem.DiscountAmount = (purchaseStoreItem.Rate * purchaseStoreItem.Quantity * purchaseStoreItem.DiscountPercentage / 100);
            else if (purchaseStoreItem.DiscountAmount >= 0 && purchaseStoreItem.DiscountPercentage == null)
                purchaseStoreItem.DiscountAmount = purchaseStoreItem.DiscountAmount;

            let discountAmount = 0;
            if (purchaseStoreItem.DiscountAmount > 0)
                discountAmount = purchaseStoreItem.DiscountAmount;
            purchaseStoreItem.TaxableAmount = (purchaseStoreItem.Rate * purchaseStoreItem.Quantity) - discountAmount;
            var GSTAmount = 0;
            if (purchaseStoreItem.GSTId > 0) {
                for (var i = 0; i < $scope.GSTList.length; i++) {
                    if ($scope.GSTList[i].GSTId == purchaseStoreItem.GSTId) {
                        GSTAmount = purchaseStoreItem.TaxableAmount * $scope.GSTList[i].GSTPercentage / 100;
                        break;
                    }
                }
            }
            purchaseStoreItem.CGSTAmount = GSTAmount / 2;
            purchaseStoreItem.SGSTAmount = GSTAmount / 2;
            purchaseStoreItem.IGSTAmount = 0;
            purchaseStoreItem.LineTotal = purchaseStoreItem.TaxableAmount + GSTAmount;
            $scope.calculateTotalandroundOffGrandTotal();

        }

        $scope.calculateTotalandroundOffGrandTotal = function () {
            $scope.calculateTotal();
            $scope.Purchase.GrandTotal = Math.round($scope.Purchase.GrandTotal);
        }

        $scope.calculateTotal = function () {
            $scope.Purchase.TotalQuantity = 0;
            $scope.Purchase.TotalAmount = 0;
            $scope.Purchase.TotalCGST = 0;
            $scope.Purchase.TotalSGST = 0;
            $scope.Purchase.TotalIGST = 0;
            $scope.Purchase.GrandTotal = 0;
            angular.forEach($scope.PurchaseStoreItemList, function (PurchaseStoreItem, key1) {
                $scope.Purchase.TotalQuantity += PurchaseStoreItem.Quantity;
                $scope.Purchase.TotalAmount += PurchaseStoreItem.TaxableAmount;
                $scope.Purchase.TotalCGST += PurchaseStoreItem.CGSTAmount;
                $scope.Purchase.TotalSGST += PurchaseStoreItem.SGSTAmount;
                $scope.Purchase.TotalIGST += PurchaseStoreItem.IGSTAmount;
                $scope.Purchase.GrandTotal += PurchaseStoreItem.LineTotal;
            })

        }

      
        //Purchase
        $scope.$watch('formPurchase.$valid', function (value) {
            $scope.IsFormPurchaseValid = value;
        })

        $scope.SavePurchase = function () {
            $scope.IsSubmitted = true;
            if ($scope.IsFormPurchaseValid) {
                var PurchaseModel = {
                    PurchaseId: $scope.Purchase.PurchaseId,
                    SupplierId: $scope.Purchase.SupplierId,
                    BillNo: $scope.Purchase.BillNo,
                    Remarks: $scope.Purchase.Remarks,
                    BillDate: loadDataService.getDateTime($scope.Purchase.BillDate),
                    PurchaseStoreItemList: $scope.PurchaseStoreItemList,
                }
                $scope.dataLoading = true;
                adminService.savePurchase(PurchaseModel)
                    .then(function (response) {
                        if (response.data.Message == 'Success') {
                            toastr.success("Purchase Successfully.");
                            $scope.resetPurchaseForm();
                        } else {
                            toastr.error(response.data.Message);
                        }
                        $scope.dataLoading = false;
                    }, function (err) {
                        toastr.error("Some error occured while fetching data");
                        $scope.dataLoading = false;
                    })

            } else {
                toastr.error("Fill all fields!", "Validation Error");
            }
        }

        $scope.resetPurchaseForm = function () {
            $scope.IsSubmitted = false;
            $scope.Purchase = {};
            $scope.Purchase.BillDate = new Date();
            $scope.PurchaseStoreItemList = [];
            $scope.formPurchase.$setPristine();
            $scope.formPurchase.$setUntouched();
            $scope.resetPurchaseStoreItemForm();
        }



























        /*--------------------------------------------------------------------------------------- Edit -----------------------------------------------------------------------*/



        var a = window.location.href;
        var b = a.split("?");
        if (b[1] != undefined) {

            var c = b[1].split("%")

            if (c != undefined) {

                var d = c[1].split("F");

                var e = d[0];
                if (e > 0) {

                    $scope.getEditPurchaseDetails = function () {


                        adminService.getEditPurchaseDetails().
                            then(function (response) {
                                if (response.data.message == 'Success') {

                                    var PurchaseStoreItemList_ByEdit = [];


                                    $scope.PurchaseList = response.data.PurchaseList[0];
                                    $scope.Purchase.PurchaseId = $scope.PurchaseList.PurchaseId;
                                    $scope.Purchase.SupplierId = $scope.PurchaseList.SupplierId;
                                    $scope.Purchase.BillNo = $scope.PurchaseList.BillNo;
                                    $scope.Purchase.Remarks = $scope.PurchaseList.Remarks;
                                    $scope.Purchase.BillDate = new Date($scope.PurchaseList.BillDate);


                                    //$scope.PurchaseStoreItemList = response.data.PurchaseStoreItemList;

                                    angular.forEach(response.data.PurchaseStoreItemList, function (acc, i) {
                                        PurchaseStoreItemList_ByEdit.push(acc);
                                        PurchaseStoreItemList_ByEdit[i].SearchStoreItem = acc.ItemName;
                                        PurchaseStoreItemList_ByEdit[i].UnitName = acc.UnitName;
                                        PurchaseStoreItemList_ByEdit[i].UnitId = acc.UnitId;
                                    })


                                    /*--------------------- Condition ------------------*/
                                    $scope.Delete_forUpdate = true;
                                    $scope.During_Edit = true;

                                    $scope.PurchaseStoreItemList = PurchaseStoreItemList_ByEdit;


                                    $scope.calculateTotal();

                                    PurchaseStoreItemList_ByEdit = [];





                                    /*------------------------- Process of Update a*/
                                    if ($scope.Update_After_Delete) {

                                        $scope.Move_to_PurchaseStoreItemList = false;
                                        $scope.UpdatePurchase();

                                        $scope.Update_After_Delete = false;
                                    }




                                    $scope.dataLoading = false;









                                    //toastr.success("Api Calling List in Process");
                                } else {
                                    toastr.error(response.data.message);
                                }
                            }, function (err) {
                                toastr.error("Some error occured while fetching data");
                            });


                    }


                    $scope.getEditPurchaseDetails();

                }
            }

        }



        /*-------------------------------------------------------- Delete Operation during Edit --------------------------------------------*/

        $scope.deletePurchaseStoreItem_fromDb = function (PurchaeStoreItem) {

            $scope.PurchaeStoreItem_Object_forDelete = PurchaeStoreItem;
            $scope.PurchaeStoreItemId_forDeleteId = PurchaeStoreItem.PurchaeStoreItemId;

            $('#modal_deletePurchaseStoreItem_fromDb_confirmation').modal('show');

        }

        $scope.Delete_PurchaseStoreItem_fromDb = function () {

            $scope.PurchaeStoreItem_Object_forDelete.Quantity = 0;
            $scope.changePurchaseStoreItem($scope.PurchaeStoreItem_Object_forDelete);



            adminService.Delete_PurchaseStoreItem_fromDb($scope.PurchaeStoreItemId_forDeleteId).
                then(function (response) {
                    if (response.data.message == 'Success') {



                        $scope.Update_After_Delete = true;
                        $('#modal_deletePurchaseStoreItem_fromDb_confirmation').modal('hide');
                        toastr.success("Record Deleted Successfully");


                        $scope.PurchaeStoreItem_Object_forDelete = ""; //---------------- Nullifying Data ------------------
                        $scope.PurchaeStoreItemId_forDeleteId = ""; //---------------- Nullifying Data ------------------


                        $scope.getEditPurchaseDetails(); //------------------ Retrieving data from Database after deletion -------------




                        //$scope.dataLoading = true;

                        //var a = false;

                        // a = alert("Update");

                        //if (a) {

                        //    $scope.dataLoading = !a;
                        //}



                    } else {
                        response.data.message;
                    }
                }, function (err) {
                    toastr.error("Some error occured while fetching data");
                });
        }


        $scope.UpdatePurchase = function () {

            $scope.dataLoading = true;

            $scope.IsSubmitted = true;
            if ($scope.IsFormPurchaseValid) {
                var PurchaseModel = {
                    PurchaseId: $scope.Purchase.PurchaseId,
                    SupplierId: $scope.Purchase.SupplierId,
                    BillNo: $scope.Purchase.BillNo,
                    Remarks: $scope.Purchase.Remarks,
                    BillDate: loadDataService.getDateTime($scope.Purchase.BillDate),
                    PurchaseStoreItemList: $scope.PurchaseStoreItemList,
                }
                $scope.dataLoading = true;
                adminService.savePurchase(PurchaseModel)
                    .then(function (response) {
                        if (response.data.Message == 'Success') {
                            toastr.success("Edited Successfully.");
                          
                            $scope.getEditPurchaseDetails();

                            $scope.dataLoading = false;

                            if ($scope.Move_to_PurchaseStoreItemList) {
                                $scope.resetPurchaseForm();
                                window.location.href = "#!/PurchaseStoreItemList";

                                $scope.Move_to_PurchaseStoreItemList = true;
                            }




                        } else {
                            toastr.error(response.data.Message);
                        }
                        $scope.dataLoading = false;
                    }, function (err) {
                        toastr.error("Some error occured while fetching data");
                        $scope.dataLoading = false;
                    })

            } else {
                toastr.error("Fill all fields!", "Validation Error");
            }
        }



    }
})();

