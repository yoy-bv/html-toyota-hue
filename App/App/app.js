﻿var app = angular.module('ToyotaDealer', ['ngRoute', 'ngSanitize']); //, [],
app.value("AppConfig", { "Api_Server": $("#hdApiUrl").val() + "/api", "Api_Server2": "" });
app.value("MessageConfig", { "message1": "<p>Thông tin đã được gửi đến email của Quý khách.</p><p>Xin trân trọng cảm ơn!</p>", "message2": "<p>Thông tin liên hệ của Quý khách đã được tiếp nhận.</p><p>Chúng tôi sẽ liên hệ Quý khách trong thời gian sớm nhất.</p><p>Xin trân trọng cảm ơn!</p>", "message3": "<p>Cám ơn quý khách đã đăng ký nhận những tin mới nhất từ chúng tôi !</p>" });

app.config(['$routeProvider', '$httpProvider', '$controllerProvider', '$provide', '$locationProvider', '$filterProvider', '$compileProvider', //
    function($routeProvider, $httpProvider, $controllerProvider, $provide, $locationProvider, $filterProvider, $compileProvider) { //
        app.registerController = $controllerProvider.register;
        app.registerService = $provide.service;
        app.registerFilter = $filterProvider.register;
        app.registerDirective = $compileProvider.directive;
        app.registerFactory = $provide.factory;
        //var version = "?ci-date=" + (new Date()).getTime();

        $locationProvider.html5Mode({ enabled: false });

        $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
            return {
                request: function(config) {
                    return config;
                },
                response: function(result) {
                    return result;
                },
                responseError: function(rejection) {
                    var date = new Date();
                    return $q.reject(rejection);
                }
            }
        }]);
    }
]);
app.run(function($http) {
    $http.defaults.headers.common['X-XSRF-Token'] =
        angular.element('input[name="__RequestToken"]').val();
});
app.service('IndexServices', function($http, AppConfig) {
    this.checkDomainDealer = function(domain) {
        return $http.get(AppConfig.Api_Server + "/Dealers/GetDelearIDbyDomain?domain=" + domain);
    }

    this.getDealerInfobyId = function(id) {
        return $http.get(AppConfig.Api_Server + "/Dealers/GetDelearbyId/" + id);
    }

    this.getMenu = function(dealerId) {
        return $http.get(AppConfig.Api_Server + "/Default/GetListCats?idDlr=" + dealerId);
    }

    this.getMeta = function(seoUrl, dealerId) {
        var str = seoUrl.split("#");
        return $http.get(AppConfig.Api_Server +
            "/Default/GetMetaSeoByDealId?SeoUrl=" +
            str +
            "&idDlr=" +
            dealerId);
    }

    this.getFooter = function(id) {
        return $http.get(AppConfig.Api_Server + "/Default/GetListFooterCats?idDlr=" + id);
    }

    this.getSearch = function(key, cateId, dealerId) {
        return $http.get(AppConfig.Api_Server + "/Default/GetSearch?idDlr=" + dealerId + "&sKey=" + key + "&iCatId=" + cateId);

    }

    this.getHighLightInHome = function(id) {
        return $http.get(AppConfig.Api_Server + "/Default/GetListNewsHighlightHome?idDlr=" + id);
    }

    this.getCarbyCatsID = function(catId, idlr) {
            return $http.get(AppConfig.Api_Server + "/Estimates/LoadCarsByCatId?idCat=" + catId + "&idDlr=" + idlr);
        }
        //dự toán chi phí
    this.getEstimate = function(carId, areaId) {
            return $http.get(AppConfig.Api_Server + "/Estimates/LoadEstimates?NewId=" + carId + "&idArea=" + areaId);
        }
        //so sanh xe mới
    this.getEstimate11 = function(carId, areaId) {
            return $http.get(AppConfig.Api_Server + "/Estimates/LoadEstimates?NewId=" + carId + "&idArea=" + areaId);
        }
        //so sanh xe cũ
    this.getEstimate2 = function(carId, areaId) {
        return $http.get(AppConfig.Api_Server + "/Estimates/LoadEstimates?NewId=" + carId + "&idArea=" + areaId);
    }
    this.LoginAPI = function(username, password) {
        return $http({
            method: "POST",
            url: AppConfig.Api_Server +
                "/Login/LoginAPI?username=" + username + "&password=" + password
        });
    }
    this.CheckEmailExist = function(email) {
        return $http({
            method: "POST",
            url: AppConfig.Api_Server +
                "/Login/CheckEmailExist?email=" + email
        });
    }
    this.SentMailHoTroTaiChinh = function (ids, fullname, semail, stenxe, stienxe, stienphukien, stientratruoc, stiendautien, stientindung, supportProduct, sgoclaicuoiki, mauxe, idDlr) {
        return $http({
            method: "POST",
            url: AppConfig.Api_Server +
                "/Tools/SentMailHoTroTaiChinh?Ids=" + ids + "&fullname=" + fullname + "&email=" + semail + "&tenxe=" + stenxe + "&tienxe=" + stienxe + "&tienphukien=" + stienphukien + "&tientratruoc=" + stientratruoc + "&tiendautien=" + stiendautien + "&tientindung=" + stientindung + "&supportProduct=" + supportProduct + "&goclaicuoiki=" + sgoclaicuoiki + "&mauxe=" + mauxe + "&iDealer=" + idDlr
        });
    }
    this.SentMailSoSanhXeMoi = function (carids, ids, fullname, email, thongso, idDlr) {
        return $http({
            method: "POST",
            url: AppConfig.Api_Server +
                "/Tools/SentMailSoSanhXeMoi?carids=" + carids + "&Ids=" + ids + "&fullname=" + fullname + "&email=" + email + "&thongso=" + thongso + "&iDealer=" + idDlr
        });
    }
    this.SentMailSoSanhXeCu = function(ids, fullname, email, thongso, idDlr) {
        return $http({
            method: "POST",
            url: AppConfig.Api_Server +
                "/Tools/SentMailSoSanhXeCu?Ids=" + ids + "&fullname=" + fullname + "&email=" + email + "&thongso=" + thongso + "&iDealer=" + idDlr
        });
    }
    this.SentMailDuToanChiPhi = function (ids, fullname, email, tenxe, tienxe, thongtintruocba, phukien, tongtien, mauxe, idDlr) {
        //console.log(thongtintruocba);
        return $http({
            method: "POST",
            url: AppConfig.Api_Server +
                "/Tools/SentMailDuToanChiPhi?Ids=" + ids + "&fullname=" + fullname + "&email=" + email + "&tenxe=" + tenxe + "&tienxe=" + tienxe + "&thongtintruocba=" + thongtintruocba + "&phukien=" + phukien + "&tongtien=" + tongtien + "&mauxe=" + mauxe + "&iDealer=" + idDlr
        });
    }

    this.postContact = function(name, email, phone, address, content, drl, branchId) {
        return $http({
            method: "POST",
            url: AppConfig.Api_Server +
                "/Contact/PostContact?sFullName=" + name + "&sEmail=" + email + "&sPhone=" + phone + "&sAddress=" + address + "&sContent=" + content + "&iDealer=" + drl + "&branchId=" + branchId
        });
    }
    this.postContactDetailProduct = function(name, email, phone, address, content, carname, carid, idDlr, branchId) {
        return $http({
            method: "POST",
            url: AppConfig.Api_Server +
                "/Contact/PostContactInDetailCar?sNameCar=" + carname + "&sFullName=" + name + "&sEmail=" + email + "&sPhone=" + phone + "&sContent=" + content + "&iDealer=" + idDlr + "&iBranch=" + branchId
        });
    }

    this.postContactDetailProductOld = function(name, email, phone, address, content, carname, carid, idDlr, branchId) {
        return $http({
            method: "POST",
            url: AppConfig.Api_Server +
                "/Contact/PostContactInDetailOldCar?sNameCar=" + carname + "&sFullName=" + name + "&sEmail=" + email + "&sPhone=" + phone + "&sContent=" + content + "&iDealer=" + idDlr + "&iBranch=" + branchId
        });
    }

    this.postContactStaff = function(name, email, phone, address, content, staffemail, staffname, drl) {
            return $http({
                method: "POST",
                url: AppConfig.Api_Server +
                    "/Contact/PostContactInEmploye?sNameEmploye=" + staffname + "&sEmailEmploye=" + staffemail + "&sFullName=" + name + "&sEmail=" + email + "&sPhone=" + phone + "&sContent=" + content + "&iDealer=" + drl
            });
        }
        //đăng ký lái thử
    this.postTestDrive = function(arrId, titleName, fName, lName, email, phone, date, time, note, adrress, iDlr, iBranch) {
        return $http({
            method: "POST",
            url: AppConfig.Api_Server +
                "/Tools/PostContactTestDrive?modelid=" + arrId + "&sName=" + titleName + "&sFName=" + lName + "&sLName=" + fName + "&sEmail=" + email + "&sPhone=" + phone + "&sDate=" + date + "&sTime=" + time + "&sNote=" + note + "&sAdrress=" + adrress + "&iDealer=" + iDlr + "&iBranch=" + iBranch
        });
    }
    this.postServiceRegister = function(arrId, titleName, fName, lName, email, phone, date, date2, time, time2, note, license, modelcar, typecar, yearcar, adrress, employer, idDlr, iBranch) {
        //console.log(AppConfig.Api_Server + "/Tools/PostContactService/?sTitle=" + arrId + "&sName=" + titleName + "&sFName=" + lName + "&sLName=" + fName + "&sEmail=" + email + "&sPhone=" + phone + "&sDate=" + date + "&sDate2=" + date2 + "&sTime=" + time + "&sTime2=" + time2 + "&sNote=" + note + "&sCarLP=" + license + "&sCarModel=" + modelcar + "&stypeCar=" + typecar + "&sCarYear=" + yearcar + "&sAddress=" + adrress + "&sEmployer=" + employer + "&iDealer=" + idDlr);
        var param = {
            sTitle: arrId,
            sName: titleName,
            sFName: lName,
            sLName: fName,
            sEmail: email,
            sPhone: phone,
            sDate: date,
            sDate2: date2,
            sTime: time,
            sTime2: time2,
            sNote: note,
            sCarLP: license,
            sCarModel: modelcar,
            stypeCar: typecar,
            sCarYear: yearcar,
            sAddress: adrress,
            sEmployer: employer,
            iDealer: idDlr,
            iBranch: iBranch
        }
        return $http({
            method: "POST",
            //url: AppConfig.Api_Server +
            //    "/Tools/PostContactService/?sTitle=" + arrId + "&sName=" + titleName + "&sFName=" + lName + "&sLName=" + fName + "&sEmail=" + email + "&sPhone=" + 
            //    phone + "&sDate=" + date + "&sDate2=" + date2 +
            //    "&sTime=" + time + "&sTime2=" + time2 + "&sNote=" + note + "&sCarLP=" + license + "&sCarModel=" + modelcar + "&stypeCar=" + typecar +
            //    "&sCarYear=" + yearcar + "&sAddress=" + adrress + "&sEmployer=" + employer + "&iDealer=" + idDlr
            url: AppConfig.Api_Server + "/Tools/PostContactService",
            params: param
        });
    }
    this.postGetNews = function(name, email, drl) {
        return $http({
            method: "POST",
            url: AppConfig.Api_Server +
                "/MailReceive/PostMailReceive?name=" + name + "&email=" + email + "&dealer=" + drl
        });
    }
    this.PostInfoPrice = function(sname, semail, sphone, sdealer) {
        return $http({
            method: "POST",
            url: AppConfig.Api_Server +
                "/InfoPrice/PostInfoPrice?sname=" + sname + "&semail=" + semail + "&sphone=" + sphone + "&sdealer=" + sdealer
        });
    }
});

app.service('CompareServices', function($http, $rootScope, AppConfig, $q) {
    this.getListSpecCompare = function() {
        var d = $q.defer();
        $http.get(AppConfig.Api_Server + "/Detail/GetListSpec").success(function(data) {
            d.resolve(data);
        });
        return d.promise;
    }

    this.getCarSpecbyID = function(id) {
        var d = $q.defer();
        $http.get(AppConfig.Api_Server + "/Detail/GetListItemsSpec?NewId=" + id).success(function(data) {
            d.resolve(data);
        });
        return d.promise;
    }

    this.GetNewsByIDInCompare = function(id, idDlr) {
        var d = $q.defer();
        $http.get(AppConfig.Api_Server + "/Default/GetIdNewCompare?idNew=" + id + "&idDlr=" + idDlr)
            .success(function(data) {
                d.resolve(data);
            });
        return d.promise;
    }

    this.getProductsByListCats = function(lstCat, idDlr) {
        return $http.get(AppConfig.Api_Server + "/Detail/GetProductsByListCatId?listCat=" + lstCat + "&idDlr=" + idDlr);
    }

    this.getIDDealerInCompare = function(domain) {
        var d = $q.defer();
        $http.get(AppConfig.Api_Server + "/Dealers/GetDelearIDbyDomain?domain=" + domain).success(function(data) {
            d.resolve(data);
        });
        return d.promise;
    }
});

app.run(['$rootScope', '$location', 'IndexServices', '$sce', '$filter', '$route', 'MessageConfig',
    function($rootScope, $location, services, $sce, $filter, $route, message) {
        $rootScope.MoneyUnit = $("#hdMoneyUnit").val();
        $rootScope.DealerID = $("#hdIdlr").val();
        /* Compare $rootScope */
        $rootScope.CarCompares = [];
        $rootScope.ListSpecDetail = [];
        $rootScope.CarComparesLength = 0;
        $rootScope.CarComparesShow = false;
        $rootScope.CarComparesContent = false;
        $rootScope.CompareStatus = "Thu nhỏ <i class='fa fa-angle-down' aria-hidden='true'></i>";
        //resetCompareArray();
        $rootScope.LinkPath = $location.path().toString().replace(/\//g, '');

        /* Search value */
        $rootScope.SearchResults = [];
        $rootScope.SearchStatusText = "";
        $rootScope.$on('$locationChangeStart', function(event, next, current, newState, oldState) {
            if (next !== current && next.indexOf('#') === -1) {
                var matches = next.match(/[a-z\d]+=[a-z\d]+/gi);
                var count = matches ? matches.length : 0;
                var t = $location.path().toString();
                t = t.replace(/\//g, '');
                //console.clear();
                console.log("next: " + next);
                console.log("current: " + current);
                console.log("$location.absUrl(): " + $location.absUrl());
                console.log("window.location.href: " + window.location.href);
                console.log("$rootScope.LinkPath: " + $rootScope.LinkPath);
                console.log("$location.path(): " + $location.path());
                alert();
                //if (next === $location.absUrl() && window.location.href === next) {

                //console.log("$rootScope.LinkPath: " + $rootScope.LinkPath);
                //console.log("$location.path(): " + t);
                //debugger;

                if ($rootScope.LinkPath != t || count < 2)
                    window.location.href = next;
                else
                    window.location.href = current;
            }
        });


        $rootScope.filterMenu = function(item) {
            return item.lSub.length > 0;
        };
        $rootScope.replaceString = function(address) {
            if (address !== undefined && address !== null)
                return address.replace(/\r?\n/g, "\<br/\>");
            else
                return "";
        }
        $rootScope.cacheMenu = 0;

        /*** Search function ***/
        $rootScope.processToSearch = function() {
            var key = $("#txtSearch").val().toLowerCase();
            $("#spKeySearch").text(key);

            if (key != "") {
                $(".waitingForSearch").css("display", "block");
                $(".completeWaitingSearch").css("display", "none");
                $("#contentResult").empty();

                $("#spError").css("display", "none");
                var cateid = $("#ddlCate").val();
                var search = services.getSearch(key, cateid, $rootScope.DealerID);
                search.then(function(results) {
                    $(".waitingForSearch").css("display", "none");
                    $(".completeWaitingSearch").css("display", "block");
                    $("#spCountResult").text(results.data.length); // so ket qua tim kiem
                    if (results.data.length > 0) {
                        $("#resultContent").show();
                        $("#contentResultFail").hide();
                        $("#txtCountResult").text(results.data.length);
                        var str = "";
                        angular.forEach(results.data,
                            function(data) {
                                str += '<li><div class="inner">' +
                                    '<p class="tt"><a href="/' +
                                    (data.newS_URL === '' ? data.newS_SEO_URL : data.newS_URL) +
                                    '">' +
                                    data.newS_TITLE +
                                    '</a></p>' +
                                    '<p class="desc">' +
                                    data.newS_DESC +
                                    '</p>' +
                                    '<p class="link_detail"><a href="/' +
                                    (data.newS_URL === '' ? data.newS_SEO_URL : data.newS_URL) +
                                    '">Chi tiết..</a></p></div></li>';
                            });
                        $(str).appendTo("#contentResult");
                        $(".no-result").css("display", "none");
                        $("#titleKetqua").css("display", "block");


                    } else {
                        $(".no-result").css("display", "block");
                        $("#titleKetqua").css("display", "none");


                    }

                });
            } else {
                $("#txtSearch.inSearchTextBox").focus();
                $("#spError").css("display", "block");
            }
        }
        $rootScope.waitingToSearch = function() {
                $rootScope.SearchStatusText = "";
            }
            /***********************/

        /*Estimates tools*/
        $rootScope.LoadAllCarbyCats = function(id, idlr) {
            var catId = $("#dllCats").val();
            if (catId > 0) {
                var t = services.getCarbyCatsID(catId, idlr);
                t.then(function(results) {
                    $rootScope.CarsEstimateList = results.data;
                    var str = "<option value='0'>CHỌN MẪU XE</option>";

                    angular.forEach(results.data,
                        function(value, index) {
                            str += "<option data-path='" +
                                value.newS_SEO_URL +
                                "' value='" +
                                value.id +
                                "'>" +
                                value.newS_TITLE +
                                "</option>";
                        });

                    $("#ddlCars").text("");
                    $(str).appendTo("#ddlCars");

                    var tmp = $("#ddlCars option").length;
                    if (tmp > 1) {
                        // Process if carId is active
                        var carId = $("#hdCarid").val();
                        if (carId !== "") {
                            $("#ddlCars option[data-path='" + carId + "']").prop("selected", "selected");
                        }
                        if ($('#ddlCars').val() === '0') {
                            $('#ddlCars option:nth-child(2)').prop('selected', 'selected');
                        }
                        var car = $("#ddlCars").val();
                        var area = $("#ddlArea").val();

                        $rootScope.loadCarEstimateInfo(car);
                        $rootScope.processEstimate(car, area);
                    } else {
                        var catName = $('#dllCats').find(":selected").text();
                        alert(catName + " chưa có phiên bản để dự toán chi phí!");
                    }
                });
            }
        }
        $rootScope.processEstimate = function(carId, areaId) {
            if (carId > 0 && areaId > 0) {
                var t = services.getEstimate(carId, areaId);
                t.then(function(results) {
                    if (results.data.length > 0) {
                        var car = $filter('filter')($rootScope.CarsEstimateList, { id: carId })[0];
                        var str = "<dl><dt>Giá xe</dt><dd>" + formatMoney(car.newS_PRICE1 + '.000') + "</dd></dl>";
                        var sumMoney = 0;

                        for (var i = 0; i < results.data.length; i++) {
                            var value = results.data[i];
                            if (value.action === 2) {
                                str += "<dl><dt>" + value.name + "</dt><dd></dd></dl>";
                                str += "<dl><dt class='dutoan_mucphi'>Mức phí</dt><dd>" + value.cost + "%</dd></dl>";
                                var money = value.cost * car.newS_PRICE1 / 100;
                                str += "<dl><dt class='dutoan_phi'>Phí</dt><dd>" +
                                    formatMoney(money + ".000") +
                                    "</dd></dl>";

                                sumMoney += money;

                            } else {
                                str += "<dl><dt>" +
                                    value.name +
                                    "</dt><dd>" +
                                    formatMoney(value.cost + ".000") +
                                    "</dd></dl>";

                                sumMoney += value.cost;
                            }
                        }

                        sumMoney += car.newS_PRICE1;

                        str += "<dl class='last'><dt>Tổng cộng</dt><dd>" + formatMoney(sumMoney + ".000") + "</dd></dl>";
                        $("#resultEstimate").fadeOut(500, function() {
                            $("#resultEstimate").html(str).fadeIn(500);
                            $("#btnSendEmail").fadeIn(500);
                        });
                    } else {
                        var str2 = "<p>Dữ liệu đang được cập nhật!</p>";
                        $("#resultEstimate").fadeOut(500, function() {
                            $("#resultEstimate").html(str2).fadeIn(500);
                            $("#btnSendEmail").fadeOut(500);
                            $('select').material_select();
                        });
                    }
                });
            } else {
                carId === 0 ? $("#ddlCars").addClass("error") : $("#ddlCars").removeClass("error");
                areaId === 0 ? $("#ddlArea").addClass("error") : $("#ddlArea").removeClass("error");

            }
        }
        $rootScope.loadCarEstimateInfo = function(carId) {
                $("#resultEstimate").fadeOut(500);
                $("#btnSendEmail").fadeOut(500);
                $("#pnCar").css('display', "none");
                if (carId > 0) {
                    var car = $filter('filter')($rootScope.CarsEstimateList, { id: carId })[0];
                    $('#imgCar').fadeOut(500, function() {
                        $('#imgCar').attr('src', '/data/news/' + car.id + '/' + car.newS_IMAGE3);
                        $('#imgCar').attr('alt', car.newS_TITLE);
                        $('#imgCar').fadeIn(500);
                    });
                    $('#titleCar').text(car.newS_TITLE);
                    $('#pnMoneyUnit').text($rootScope.MoneyUnit);
                    $('#pnPriceCar').text(formatMoney(car.newS_PRICE1 + '.000'));
                    $("#pnCar").css('display', "block");
                }

                $('select').material_select();
            }
            /***********************/

        /*** Javascript function ***/
        $rootScope.LoginAPI = function(username, password) {
            services.LoginAPI(username, password);
        }
        $rootScope.CheckEmailExist = function(email) {
            services.CheckEmailExist(email);
        }
        $rootScope.SentMailHoTroTaiChinh = function(ids, fullname, semail, stenxe, stienxe, stienphukien, stientratruoc, stiendautien, stientindung, supportProduct, sgoclaicuoiki, mauxe, idDlr) {
            services.SentMailHoTroTaiChinh(ids, fullname, semail, stenxe, stienxe, stienphukien, stientratruoc, stiendautien, stientindung, supportProduct, sgoclaicuoiki, mauxe, idDlr);
            $(".fancybox-close-small").click();
            //$.fancybox.close(all);
            showErrorbyAlert('Hỗ trợ tài chính', message.message1, "");
        }
        $rootScope.SentMailSoSanhXeMoi = function (carids, ids, fullname, email, thongso, idDlr) {
            services.SentMailSoSanhXeMoi(carids, ids, fullname, email, thongso, idDlr);
            $(".fancybox-close-small").click();
            //$.fancybox.close(all);
            showErrorbyAlert('So sánh', message.message1, "");
        }
        $rootScope.SentMailSoSanhXeCu = function(ids, fullname, email, strTable, idDlr) {
            services.SentMailSoSanhXeCu(ids, fullname, email, strTable, idDlr);
            $(".fancybox-close-small").click();
            //$.fancybox.close(all);
            showErrorbyAlert('So sánh xe đã qua sử dụng', message.message1, "");
        }
        $rootScope.SentMailDuToanChiPhi = function(ids, fullname, email, tenxe, tienxe, thongtintruocba, phukien, tongtien, mauxe, idDlr) {
            services.SentMailDuToanChiPhi(ids, fullname, email, tenxe, tienxe, thongtintruocba, phukien, tongtien, mauxe, idDlr);
            $(".fancybox-close-small").click();
            //$.fancybox.close(all);
            showErrorbyAlert('Dự toán chi phí', message.message1, "");
        }
        $rootScope.PostContact = function(name, email, phone, address, content, drl, branchId) {
            services.postContact(name, email, phone, address, content, drl, branchId);
            showSuccessbyAlert('Liên hệ', message.message2, "");
            $(".fancybox-close-small").click();
            ////$.fancybox.close(all);
        }
        $rootScope.PostContactDetailProduct = function(name, email, phone, address, content, carname, carid, idDlr, branchId) {
            services.postContactDetailProduct(name, email, phone, address, content, carname, carid, idDlr, branchId);
            showSuccessbyAlert('Liên hệ', message.message2, "");
            $(".fancybox-close-small").click();
        }
        $rootScope.PostContactDetailProductOld = function(name, email, phone, address, content, carname, carid, idDlr, branchId) {
            services.postContactDetailProductOld(name, email, phone, address, content, carname, carid, idDlr, branchId);
            showSuccessbyAlert('Liên hệ', message.message2, "");
            $(".fancybox-close-small").click();
        }


        $rootScope.PostTestDrive = function(arrId, titleName, fName, lName, email, phone, date, time, note, adrress, iDlr, iBranch) {
            services.postTestDrive(arrId, titleName, fName, lName, email, phone, date, time, note, adrress, iDlr, iBranch);
            $(".testdrive_tabs .complete").addClass("notclick");
            //if (email.length > 3) {
            //    showSuccessbyAlert('Đăng ký lái thử', message.message2, "");
            //}
            $(".testdrive_tabs .tab").not(".complete").addClass("disabled-notclick");

        }
        $rootScope.PostRegisterService = function(arrId, titleName, fName, lName, email, phone, date, date2, time, time2, note, license, modelcar, typecar, yearcar, adrress, employer, idDlr, iBranch) {
            services.postServiceRegister(arrId, titleName, fName, lName, email, phone, date, date2, time, time2, note, license, modelcar, typecar, yearcar, adrress, employer, idDlr, iBranch);
            //console.log(arrId);
            $(".dangkydichvu_tabs .complete").addClass("notclick");
            //if (email.length > 3) {
            //    showSuccessbyAlert('Đăng ký dịch vụ', "<p>Xin cảm ơn!</p><p>Chúng tôi sẽ liên hệ Quí khách trong thời gian sớm nhất.</p>", "");
            //}
            $(".dangkydichvu_tabs .tab").not(".complete").addClass("disabled-notclick");
        }
        $rootScope.PostMailReceive = function(name, email, drl) {
            var t = services.postGetNews(name, email, drl);
            showSuccessbyAlert('Đăng ký nhận tin', message.message3, "");
            //t.then(function(results) {
            //    //Show #mainAlert: add class active
            //    $("#mainAlert").addClass("active");
            //    // Success: add class style2 to #mainAlert
            //    $("#mainAlert").addClass("style2");
            //    // Add message to #mainAlert-Content
            //    $("#mainAlert-Content").html("Cảm ơn Quý khách đã đăng ký nhận tin<br/>Chúng tôi sẽ gửi những tin tức mới nhất đến bạn!");
            //    // Auto close alert
            //    setTimeout(function() {
            //        $('.ci-toast').removeClass('active');
            //    }, 3500);
            //}, function(error) {
            //    //Show #mainAlert: add class active
            //    $("#mainAlert").addClass("active");
            //    // Error: romve class style1 in mainAlert
            //    $("#mainAlert").removeClass("style2");
            //    // Add message to #mainAlert-Content
            //    $("#mainAlert-Content").html("Chúng tôi rất tiếc!<br/>Đã xảy ra lỗi trong quá trình gửi yêu cầu.");
            //    // Auto close alert
            //    setTimeout(function() {
            //        $('.ci-toast').removeClass('active');
            //    }, 3000);
            //});
        }
        $rootScope.PostInfoPrice = function(sname, semail, sphone, sdealer) {
            var t = services.PostInfoPrice(sname, semail, sphone, sdealer);
            t.then(function(results) {
                //Show #mainAlert: add class active
                $("#mainAlert").addClass("active");
                // Success: add class style2 to #mainAlert
                $("#mainAlert").addClass("style2");
                // Add message to #mainAlert-Content
                $("#mainAlert-Content").html("Cảm ơn Quý khách đã đăng ký nhận báo giá<br/>Chúng tôi sẽ gửi bảng giá mới nhất đến bạn!");
                $("#txtNameInfoHome").val("");
                $("#txtEmailInfoHome").val("");
                $("#txtPhoneInfoHome").val("");
                $("#txtCapchaInfoHome").val("");
                // Auto close alert
                setTimeout(function() {
                    $('.ci-toast').removeClass('active');
                }, 3500);
            }, function(error) {
                //Show #mainAlert: add class active
                $("#mainAlert").addClass("active");
                // Error: romve class style1 in mainAlert
                $("#mainAlert").removeClass("style2");
                // Add message to #mainAlert-Content
                $("#mainAlert-Content").html("Chúng tôi rất tiếc!<br/>Đã xảy ra lỗi trong quá trình gửi yêu cầu.");
                // Auto close alert
                setTimeout(function() {
                    $('.ci-toast').removeClass('active');
                }, 3000);
            });
        }
        $rootScope.PostMessageContactStaff = function(name, email, phone, address, content, staffemail, staffname, drl) {
                //var t = services.postContactStaff(name, email, phone, address, content, staffemail, staffname, drl);
                //t.then(function (results) {

                //    //openToast();
                //}, function (error) {
                //    // Add message to #mainAlert-Content
                //    $("#mainAlert-Content").html("Chúng tôi rất tiếc!<br/>Đã xảy ra lỗi trong quá trình gửi yêu cầu.");
                //    openToast();
                //});
                services.postContactStaff(name, email, phone, address, content, staffemail, staffname, drl);
                showSuccessbyAlert('Liên hệ', "<p>Thông tin liên hệ của Quý khách đã được tiếp nhận. <br/>" + staffname + " sẽ liên hệ Quý khách trong thời gian sớm nhất. Xin trân trọng cảm ơn!</p>");
                $(".fancybox-close-small").click();
                //$.fancybox.close(all);
            }
            /****************/
    }
]);

function loadDealerDefault($rootScope, $location, services) {
    //if ($rootScope.DealerID === undefined) {
    //    var checkDomain = services.checkDomainDealer($location.host());
    //    checkDomain.then(function (result) {
    //        $rootScope.DealerID = result.data;

    //    });
    //}//var getDealerInfo = services.getDealerInfobyId($rootScope.DealerID);
    //getDealerInfo.then(function (result) {
    //    $rootScope.CurrentDealer = result.data;
    //}, function (error) { });
}

function formatMoney(inputText) {
    var t = inputText.split('.');
    inputText = t[0];
    // pattern works from right to left
    var commaPattern = /(\d+)(\d{3})(\.\d*)*$/;
    var callback = function(match, p1, p2, p3) {
        return p1.replace(commaPattern, callback) + '.' + p2 + (p3 || '');
    };
    return inputText.replace(commaPattern, callback);
}

app.directive('onFinishRenderCompare', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit(attr.onFinishRenderCompare);
                });
            }
        }
    }
});

app.controller('CompareController', ['$scope', '$rootScope', '$location', 'CompareServices', '$routeParams', '$q', 'IndexServices',
    function($scope, $rootScope, $location, service, $routeParams, $q, indexServices) {
        $scope.ListCats = [];
        $scope.ListCars = [];
        // Get all car for default
        service.getProductsByListCats("", $rootScope.DealerID).then(function(results) {
            $scope.ListCars = results.data;
        });

        $(".ckDeclareNewTool").on("click", function() {
            var t = checkListInMobileChange();
            if (t == false)
                ChangeListProductsTool_Compare();
        });

        $(".btn-filter-tools").on("click", function() {
            ChangeListProductsTool_Compare();
            $('#open_menu_dt').attr("isfilter", "true");
            //filterMobileListProduct();
        });

        $(".ckPriceTool").on("click", function(e) {
            $(".ckPriceTool:checked").not(this).prop("checked", "");
        });
        $(".checkCarToolCompare").on("click", function() {
            var number = 3;
            if ($("html").hasClass("mobile"))
                number = 2;
            var t = $(".checkCarToolCompare:checked");
            if (t.length > number)
                $(this).prop("checked", "");
        });

        $(".compare_tabs .next_btn_0").on("click", function() {
            $("#tabMain01").find("a").click();
        });

        $scope.listSpecToCompareTest = [];
        $scope.CarCompares = [];
        $scope.lstCars = { lstCar1: [], lstCar2: [], lstCar3: [] };
        $scope.Cars = { Car1: {}, Car2: {}, Car3: {} };
        $scope.cats = { cat1: [], cat2: [], cat3: [] };
        $scope.DetailsCar = { DetailsCar1: {}, DetailsCar2: {}, DetailsCar3: {} };

        $scope.executeCompare = function() {
            var t = $("input.checkCarToolCompare:checked");
            if (t.length > 1 && t.length <= 3) {
                var foo = [];
                var test = 0;
                $(t).each(function() {
                    foo.push($(this).data('idcar'));
                    if ($scope.CarCompares.length > 0) {
                        for (var i = 0; i < $scope.CarCompares.length; i++) {
                            if ($scope.CarCompares[i].carId == $(this).data('idcar'))
                                test++;
                        }
                    }
                });

                $(".compare_tabs .tab").find("a").removeClass("active");
                $("#tabMain02").find("a").addClass("active");
                $(".compare_tabs .content-tab").css("display", "none");
                $("#tab_cp_02").css("display", "block");

                if (test <= foo.length) {
                    processingToCompare($scope, $rootScope, $location, service, foo, $q);
                } else {
                    $('.compare_tabs ul.tabs').tabs('select_tab', 'tab_dt_tongquan');
                }

            } else {
                if (t.length > 3)
                    showErrorbyAlert("So sánh xe", "Vui lòng chọn tối đa 3 phiên bản xe!", "");
                else
                    showErrorbyAlert("So sánh xe", "Vui lòng chọn ít nhất 2 phiên bản xe!", "");
            }
        }
        $scope.$on('ngRepeatFinishedCompareSelected',
            function(event) {
                // Check test drive button

                var id = $("#hdCatId").val();
                var dealerId = $("#hdIdlr").val();
                var api = $("#hdApiUrl").val();
                var awesomeToyota = toyotaDealerLog();
                var link = "";
                $.ajax({
                    type: "Get",
                    url: api + "/api/Tools/LoadListCatsCompare?idDlr=" + dealerId,
                    headers: {
                        'Authorization': 'X-XSRF-Token ' + awesomeToyota,
                        'X-XSRF-Token': awesomeToyota,
                        'Content-Type': 'application/json'
                    },
                    success: function(data) {

                        if (data.length > 0) {
                            $(".ckCompareCarChecked").each(function() {
                                var caturl = $(this).data("caturl");
                                var carid = $(this).data("carid");
                                var t = 0;
                                for (var i = 0; i < data.length; i++) {
                                    if (caturl == data[i].caT_SEO_URL) {
                                        t = t + 1;
                                        break;
                                    }
                                }

                                if (t == 0) {
                                    $(".break-side" + carid).addClass("hide");
                                    $(".test-drive-link" + carid).addClass("hide");
                                }
                            });
                        }


                    }
                });

            });
        $scope.$on('ngRepeatFinishedCarCompare',
            function(event) {
                var carId1 = $("#dllCar1").val();
                var carId2 = $("#dllCar2").val();
                var carId3 = $("#dllCar3").val();
                removeDisableSelect(carId1, carId2, carId3);
            });
        $scope.$on('ngRepeatFinishedCarbyCatsCompare',
            function(event) {
                //$('img').each(function () {
                //    if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth === 0) {
                //        // image was broken, replace with your new image
                //        this.src = '/Content/images/notfound.png';
                //    }
                //});
            });
        $scope.$on('ngRepeatFinishedSpecSelected', function(event) {
            $('.compare_tabs ul.tabs').tabs();
            $('.compare_tabs ul.tabs').tabs('select_tab', 'tab_dt_tongquan');
            //Xe trang so sanh
            $(window).scroll(function() {
                if ($(window).scrollTop() >= 300) {
                    $('.target_compare, .target3').addClass('pinned');
                } else {
                    $('.target_compare, .target3').removeClass('pinned');
                }
            });
        });
        $scope.filterCarID = function(item) {
            return item.carId > 0;
        }
        $scope.restartCompare = function(element) {
            $("input.checkCarToolCompare:checked").prop("checked", "");
            $("input.ckCompareCarChecked:checked").each(function() {
                var t2 = $(this).data("carid");
                $("input.checkCarToolCompare[data-idcar='" + t2 + "']").prop("checked", "checked");
            });
            var t = $("input.checkCarToolCompare:checked");
            if (t.length > 1 && t.length <= 3) {
                var foo = [];
                $(t).each(function() {
                    foo.push($(this).data('idcar'));
                });

                processingToCompare($scope, $rootScope, $location, service, foo, $q);

                $("#tabMain02").removeClass("disabled");
                $('.compare_tabs ul.tabs').tabs('select_tab', 'tab_cp_02');
            } else {
                if (t.length < 2)
                    $('.compare_tabs ul.tabs').tabs('select_tab', 'tab_cp_01');
            }
        }
        $scope.loadCarbyCatsID = function(catNum) {
            switch (catNum) {
                case 1:
                    $scope.Cars.Car1 = {};
                    indexServices.getCarbyCatsID($scope.cats.cat1, $rootScope.DealerID)
                        .then(function(results) {
                            $scope.lstCars.lstCar1 = results.data;
                            $scope.DetailsCar.DetailsCar1 = {};
                            if ($scope.Cars.Car1 !== null) {
                                $scope.loadCarbyID(1);
                            }
                        });
                    break;
                case 2:
                    $scope.Cars.Car2 = {};
                    indexServices.getCarbyCatsID($scope.cats.cat2, $rootScope.DealerID)
                        .then(function(results) {
                            $scope.lstCars.lstCar2 = results.data;
                            $scope.DetailsCar.DetailsCar2 = {};
                        });
                    break;
                case 3:
                    $scope.Cars.Car3 = {};
                    indexServices.getCarbyCatsID($scope.cats.cat3, $rootScope.DealerID)
                        .then(function(results) {
                            $scope.lstCars.lstCar3 = results.data;
                            $scope.DetailsCar.DetailsCar3 = {};
                        });
                    break;
                default:
                    break;
            }
        }
        $scope.LoadCarbyCats = function() {
            var t = $("input.ckDongXe:checked");
            var lstCats = "";
            if (t.length > 0) {
                $(t).each(function() {
                    lstCats += $(this).val() + ",";
                });
                lstCats = lstCats.substr(0, lstCats.length - 1);
                service.getProductsByListCats(lstCats, $rootScope.DealerID).then(function(results) {
                    $scope.ListCars = results.data;
                });
            } else {
                $scope.ListCars = [];
            }
        }
        $scope.loadCarbyID = function(catNum) {
            switch (catNum) {
                case 1:
                    angular.forEach($scope.lstCars.lstCar1, function(value, index) {
                        if (value.id == $scope.Cars.Car1) {
                            $scope.DetailsCar.DetailsCar1 = value;
                        }
                    });
                    if ($scope.DetailsCar.DetailsCar1.newS_PRICE1 !== undefined)
                        $scope.DetailsCar.DetailsCar1.price = formatMoney($scope.DetailsCar.DetailsCar1.newS_PRICE1 + ".000") + " " + $rootScope.MoneyUnit;
                    break;
                case 2:
                    angular.forEach($scope.lstCars.lstCar2, function(value, index) {
                        if (value.id == $scope.Cars.Car2) {
                            $scope.DetailsCar.DetailsCar2 = value;
                        }
                    });
                    $scope.DetailsCar.DetailsCar2.price = formatMoney($scope.DetailsCar.DetailsCar2.newS_PRICE1 + ".000") + " " + $rootScope.MoneyUnit;
                    break;
                case 3:
                    angular.forEach($scope.lstCars.lstCar3, function(value, index) {
                        if (value.id == $scope.Cars.Car3) {
                            $scope.DetailsCar.DetailsCar3 = value;
                        }
                    });
                    $scope.DetailsCar.DetailsCar3.price = formatMoney($scope.DetailsCar.DetailsCar3.newS_PRICE1 + ".000") + " " + $rootScope.MoneyUnit;
                    break;
                default:
                    break;
            }
        }
        activeFirstCatByUrl($scope);
        $scope.removeCarDisplay = function(type) {
            switch (type) {
                case 1:
                    $scope.Cars.Car1 = {};
                    $scope.DetailsCar.DetailsCar1 = {};
                    break;
                case 2:
                    $scope.Cars.Car2 = {};
                    $scope.DetailsCar.DetailsCar2 = {};
                    break;
                case 3:
                    $scope.Cars.Car3 = {};
                    $scope.DetailsCar.DetailsCar3 = {};
                    break;
                default:
                    break;
            }
            removeDisableSelect($scope.Cars.Car1, $scope.Cars.Car2, $scope.Cars.Car3);
        }
    }
]);

app.controller('CompareOldController', ['$scope', '$rootScope', '$location', 'CompareServices', '$routeParams', '$q', 'IndexServices',
    function($scope, $rootScope, $location, service, $routeParams, $q, indexServices) {
        $scope.ListCats = [];
        $scope.ListCars = [];

        $(".ckDeclareNewTool").on("click", function() {
            var t = checkListInMobileChange();
            if (t == false)
                ChangeListProductsTool_Compare();
        });

        $(".btn-filter-tools").on("click", function() {
            ChangeListProductsToolOld_Compare();
            $('#open_menu_dt').attr("isfilter", "true");
            //filterMobileListProduct();
        });


        $(".ckDeclareOldTool").on("click", function() {
            if ($(this).hasClass("ckPriceToolOld")) {
                $(".ckPriceToolOld:checked").not(this).prop("checked", "");
            }

            var t = checkListInMobileChange();
            if (t == false)
                ChangeListProductsToolOld_Compare();
        });
        $(".checkCarOldToolCompare").on("click", function() {
            var number = 3;
            if ($("html").hasClass("tb") || $("html").hasClass("mb"))
                number = 2;
            var t = $(".checkCarOldToolCompare:checked");
            if (t.length > number)
                $(this).prop("checked", "");
        });

        $scope.CarCompares = [];
        $scope.executeCompare = function() {
            var t = $("input.checkCarOldToolCompare:checked");
            if (t.length > 1 && t.length <= 3) {
                var foo = [];
                var test = 0;
                $(t).each(function() {
                    foo.push($(this).data('idcar'));
                    if ($scope.CarCompares.length > 0) {
                        for (var i = 0; i < $scope.CarCompares.length; i++) {
                            if ($scope.CarCompares[i].carId == $(this).data('idcar'))
                                test++;
                        }
                    }
                });

                $(".compare_tabs .tab").find("a").removeClass("active");
                $("#tabMain02").find("a").addClass("active");
                $(".compare_tabs .content-tab").css("display", "none");
                $("#tab_cp_02").css("display", "block");

                if (test <= foo.length) {
                    processingToCompareOld($scope, $rootScope, $location, service, foo, $q);
                } else {
                    $('.compare_tabs ul.tabs').tabs('select_tab', 'tab_dt_tongquan');
                }
            } else {
                if (t.length > 3)
                    showErrorbyAlert("So sánh xe đã qua sử dụng", "Vui lòng chọn tối đa 3 phiên bản xe!", "");
                else
                    showErrorbyAlert("So sánh xe đã qua sử dụng", "Vui lòng chọn ít nhất 2 phiên bản xe!", "");
            }
        }

        $scope.$on('ngRepeatFinishedCompareSelected',
            function(event) {
                //$('img').each(function () {
                //    if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
                //        // image was broken, replace with your new image
                //        this.src = '/Content/images/notfound.png';
                //    }
                //});
            });
        $scope.$on('ngRepeatFinishedCarCompare',
            function(event) {
                var carId1 = $("#dllCar1").val();
                var carId2 = $("#dllCar2").val();
                var carId3 = $("#dllCar3").val();
                removeDisableSelect(carId1, carId2, carId3);
            });
        $scope.$on('ngRepeatFinishedCarbyCatsCompare',
            function(event) {
                //$('img').each(function () {
                //    if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth === 0) {
                //        // image was broken, replace with your new image
                //        this.src = '/Content/images/notfound.png';
                //    }
                //});
            });
        $scope.$on('ngRepeatFinishedSpecSelected', function(event) {
            $('.compare_tabs ul.tabs').tabs();
            $('.compare_tabs ul.tabs').tabs('select_tab', 'tab_dt_tongquan');
            //Xe trang so sanh
            $(window).scroll(function() {
                if ($(window).scrollTop() >= 300) {
                    $('.target_compare, .target3').addClass('pinned');
                } else {
                    $('.target_compare, .target3').removeClass('pinned');
                }
            });
        });
        $scope.filterCarID = function(item) {
            return item.carId > 0;
        }
        $scope.restartCompare = function(element) {
            $("input.checkCarOldToolCompare:checked").prop("checked", "");
            $("input.checkCarOldToolSelected:checked").each(function() {
                var t2 = $(this).data("carid");
                $("input.checkCarOldToolCompare[data-idcar='" + t2 + "']").prop("checked", "checked");
            });
            var t = $("input.checkCarOldToolCompare:checked");
            if (t.length > 1 && t.length <= 3) {
                var foo = [];
                $(t).each(function() {
                    foo.push($(this).data('idcar'));
                });

                processingToCompareOld($scope, $rootScope, $location, service, foo, $q);

                $("#tabMain02").removeClass("disabled");
                $('.compare_tabs ul.tabs').tabs('select_tab', 'tab_cp_02');
            } else {
                if (t.length < 2)
                    $('.compare_tabs ul.tabs').tabs('select_tab', 'tab_cp_01');
            }
        }
    }
]);

function removeDisableSelect(carId1, carId2, carId3) {

    $("#dllCar1 option").removeAttr("disabled");
    $("#dllCar2 option").removeAttr("disabled");
    $("#dllCar3 option").removeAttr("disabled");

    if (carId1 > 0) {
        $("#dllCar2 option[value='" + carId1 + "']").prop("disabled", "disabled");
        $("#dllCar3 option[value='" + carId1 + "']").prop("disabled", "disabled");
    }
    if (carId2 > 0) {
        $("#dllCar1 option[value='" + carId2 + "']").prop("disabled", "disabled");
        $("#dllCar3 option[value='" + carId2 + "']").prop("disabled", "disabled");
    }
    if (carId3 > 0) {
        $("#dllCar1 option[value='" + carId3 + "']").prop("disabled", "disabled");
        $("#dllCar2 option[value='" + carId3 + "']").prop("disabled", "disabled");
    }
}

/* Compare Car */
function activeFirstCatByUrl($scope) {
    var cars = window.location.toString();
    var arr = cars.split("/");
    var catList = [];
    var carList = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].search("cat") === 0) {
            catList = arr[i];
        }
        if (arr[i].search("car") === 0) {
            carList = arr[i];
        }
    }

    if (catList.length > 0) {
        catList = catList.replace("#", "");
        catList = catList.replace("cat=", "");
        carList = carList.replace("#", "");
        carList = carList.replace("car=", "");

        if (catList !== "") {
            var cat = $("#dllCats1 option[data-path=" + catList + "]");
            if (cat !== undefined) {
                $scope.cats.cat1 = $(cat).attr("value");
                $scope.loadCarbyCatsID(1);

                var car = $("#ddlAllCar option[value=" + carList + "]");
                if (car !== undefined) {
                    $scope.Cars.Car1 = $(car).attr("data-id");
                }
            }
            $scope.CarLength = 0;
        }
    }
}

function processingToCompare($scope, $rootScope, $location, service, arrayFirst, $q) {

    $scope.CarLength = arrayFirst.length;
    // Get car information
    getCarCompare(service, $scope, $rootScope, arrayFirst);


    // Analytics function
    var isCan = checkCanGetAPost("ciCompareCountperDay");
    if (isCan)
        postCompareClick(arrayFirst);

}

function getCarCompare(service, $scope, $rootScope, arrayCar) {
    $scope.CarCompares = [];

    angular.forEach(arrayCar, function(ele, index) {
        var val2 = service.GetNewsByIDInCompare(ele, $rootScope.DealerID);
        val2.then(function(results) {
            var tmp = results.id === 0 ? -1 : results.id;
            var val = service.getCarSpecbyID(tmp);
            val.then(function(result) {
                if (results.id !== 0) {
                    var t = {
                        carId: results.id,
                        carUrl: (results.newS_URL === '' ? results.newS_SEO_URL : results.newS_URL),
                        carName: results.newS_TITLE,
                        carImg: "/data/news/" + results.id + "/" + results.newS_IMAGE3,
                        carPrice: formatMoney(results.newS_PRICE1 + ".000"),
                        catUrl: results.caT_SEO_URL,
                        carSpec: result,
                        checked: true,
                        lSummary: results.lNameDeclare
                    };
                    $scope.CarCompares.push(t);
                }
                if ($scope.CarCompares.length === arrayCar.length) {
                    var arr = $scope.CarCompares;
                    CreateSummary_Compare(arr);
                    getDetailData(service, $scope);
                   // $(".btnSendEmail").removeClass("disabled-button");
                    $(".btnSendEmail").parent().removeClass("disabled-button");
                }
            });
        });
    });
}

function getDetailData(service, $scope) {
    $scope.ListSpecDetail = [];
    var getListSepc = service.getListSpecCompare();
    getListSepc.then(function(results) {
        $scope.ListSpec = results;
        for (var i = 0; i < $scope.ListSpec.length; i++) {
            var rank2 = $scope.ListSpec[i];
            var temp = 1;
            if (rank2.spE_G_RANK == 2) {
                for (var j = 0; j < $scope.ListSpec.length; j++) {
                    var rank3 = $scope.ListSpec[j];
                    if ((rank3.spE_G_RANK == 3 && rank3.spE_G_PARENT_ID == rank2.id)
                        || (rank3.spE_G_RANK == 2 && rank3.id == rank2.id)) {
                        var t = {};
                        var ispushRow = 0;
                        t.rank2Name = (temp == 1 ? rank2.spE_G_NAME : "");
                        t.parentId = rank2.spE_G_PARENT_ID;
                        t.specId = rank3.id;
                        t.rand3Name = rank3.spE_G_NAME;
                        t.rand3Plus = rank3.spE_G_PLUS;
                        t.values = [];
                        for (var car = 0; car < $scope.CarCompares.length; car++) {
                            var carSpec = $scope.CarCompares[car].carSpec;
                            var c = 1;
                            var sizeOfSpec = carSpec.length;
                            if (sizeOfSpec > 0) {
                                for (var z = 0; z < sizeOfSpec; z++) {
                                    if (carSpec[z].spE_GROUP_ID == t.specId) {
                                        var val = { value: carSpec[z].spE_I_DESC };
                                        t.values.push(val);
                                        c = 2;
                                        break;
                                    }
                                }
                            }
                            if (c == 1) {
                                var val2 = { value: "-" };
                                t.values.push(val2);

                                ispushRow += 1;
                            }
                        }
                        if (ispushRow < $scope.CarCompares.length) {
                            $scope.ListSpecDetail.push(t);
                            temp++;
                        }
                    }
                }
            }
        }
    });
}

function CreateSummary_Compare(array) {
    $("#tbodyTongQuan").empty();
    var str = "";
    var arraySum = [];
    for (var tj = 0; tj < array.length; tj++) {
        if (array[tj].lSummary != undefined && array[tj].lSummary.length > 0) {
            arraySum = array[tj].lSummary;
            break;
        }
    }
    if (arraySum != undefined && arraySum.length > 0)
        for (var i = 0; i < arraySum.length; i++) {
            var classtq = "tqtablelst" + i;
            str += '<tr><td class="rowlst tqrowlst">' +
                arraySum[i].decL_DESC +
                '</td><td></td><td></td><td><table><tbody><tr class=' + classtq + '>';
            for (var j = 0; j < array.length; j++) {
                if (array[j].lSummary[i] != undefined)
                    str += '<td style="font-weight: normal">' + array[j].lSummary[i].decL_NAME + '</td>';
                else
                    str += '<td style="font-weight: normal">-</td>';
                //str += '<td style="font-weight: normal">' + array[j].lSummary[i].decL_NAME + '</td>';
            }
            str += '</tr></tbody></table></td></tr>';
        }
    $(str).appendTo("#tbodyTongQuan");
}

function ChangeListProductsTool_Compare() {
    var sortNum = 0;
    var seoUrl = $("#hdSeoUrlTool").val();
    var dealerId = $("#hdIdlr").val();
    var api = $("#hdApiUrl").val();

    var lstCat = GetDataNew("ckCat");
    var lstPrice = GetDataNew("ckPriceTool");
    var lstSeat = GetDataNew("ckSeat");
    var lstStyle = GetDataNew("ckStyle");
    var lstFuel = GetDataNew("ckFuel");
    var lstMadeIn = GetDataNew("ckMadeIn");
    var link = "?sPage=0&_SeoUrl=" + seoUrl + "&idDlr=" +
        dealerId + "&sPrice=" + lstPrice + "&sCat=" + lstCat + "&sStyle=" + lstStyle + "&sFuel=" + lstFuel + "&iSort=" + sortNum + "&sSeat=" + lstSeat + "&sOrigin=" + lstMadeIn;
    var awesomeToyota = toyotaDealerLog();
    var selectCar = getSelectCarCompare();
    $.ajax({
        type: "Get",
        url: api + "/api/Detail/GetListNewsCar" + link,
        headers: {
            'Authorization': 'Basic ' + awesomeToyota,
            'X-XSRF-Token': awesomeToyota,
            'Content-Type': 'application/json'
        },
        success: function(data) {
            var str = "";
            var countList = data.lModels.length;
            $("#ulSlideMobile").fadeOut(200, function() {
                $("#ulSlideMobile").empty();
            });
            var money = $("#hdMoneyUnit").val();
            if (countList > 0) {
                for (var j = 0; j < countList; j++) {
                    var mon = formatMoney(data.lModels[j].newS_PRICE1 + ".000");
                    var dataurl = data.lModels[j].newS_URL === "" ?
                        data.lModels[j].newS_SEO_URL :
                        data.lModels[j].newS_URL;
                    var check = false;
                    var priceZeroText = "Sẽ cập nhật sau";
                    var priceStr = '';
                    if (data.lModels[j].newS_PRICE1 == 0)
                        priceStr = '<span>' + priceZeroText + '</span>';
                    else
                        priceStr = '<span>' + mon + '</span> <sup>' + money + '</sup>';

                    for (var ce = 0; ce < selectCar.length; ce++) {
                        if (selectCar[ce].idcar == data.lModels[j].id) {
                            check = true;
                            selectCar.splice(ce, 1);
                            break;
                        }
                    }

                    str += '' +
                        '<li class="item">' +
                        '<div class="inner">' +
                        '<div class="sm_checkbox">' +
                        '<input ' +
                        (check ? 'checked' : '') +
                        ' type="checkbox" data-url="' + dataurl +
                        '" data-image="/data/news/' + data.lModels[j].id + '/' + data.lModels[j].newS_IMAGE2 +
                        '" data-catid="' + data.lModels[j].caT_ID +
                        '" data-caturl="' + data.lModels[j].caT_SEO_URL +
                        '" data-name="' + data.lModels[j].newS_TITLE +
                        '" data-price="' + mon +
                        '" data-idCar="' + (data.lModels[j].id) + '" class="checkCarToolCompare" id="checkbox-0' + (data.lModels[j].id) +
                        '">' +
                        //lbl
                        '<label for="checkbox-0' + (data.lModels[j].id) + '">' +
                        //img
                        '<span class="img">' +
                        "<img class='lazy' src='/Content/images/loader.gif' data-original='/data/news/" + data.lModels[j].id + "/" + data.lModels[j].newS_IMAGE3 + "'/>" +
                        '</span>' +
                        //content
                        '<span class="txt">' +
                        '<span class="txt1"><span class="check"></span></span>' +
                        '<span class="txt2">' +
                        //name
                        '<span class="name">' +
                        data.lModels[j].newS_TITLE +
                        '</span>' +
                        //price
                        '<span class="price">' +
                        'Giá từ: ' + priceStr +
                        '</span>' +
                        '</span>' +
                        '</span>' +

                        '</label>' +
                        '</div></div></li>';
                }

                for (var c = 0; c < selectCar.length; c++) {
                    var priceZeroText = "Sẽ cập nhật sau";
                    var priceStr = '';
                    if (selectCar[c].price == 0)
                        priceStr = '<span>' + priceZeroText + '</span>';
                    else
                        priceStr = '<span>' + selectCar[c].price + '</span> <sup>' + money + '</sup>';

                    str += '' +
                        '<li class="item" style="display: none">' +
                        '<div class="inner">' +
                        '<div class="sm_checkbox">' +
                        '<input checked type="checkbox" data-url="' +
                        selectCar[c].url +
                        '" data-image="' +
                        selectCar[c].image +
                        '" data-catid="' +
                        selectCar[c].catid +
                        '" data-caturl="' +
                        selectCar[c].caturl +
                        '" data-name="' +
                        selectCar[c].name +
                        '" data-price="' +
                        selectCar[c].price +
                        '" data-idCar="' +
                        (selectCar[c].idcar) +
                        '" class="checkCarToolCompare" id="checkbox-0' +
                        (selectCar[c].idcar) +
                        '">' +
                        //lbl
                        '<label for="checkbox-0' + (selectCar[c].idcar) + '">' +
                        //img
                        '<span class="img">' +
                        "<img class='lazy' src='/Content/images/loader.gif' data-original='" + selectCar[c].image + "'/>" +
                        '</span>' +
                        //content
                        '<span class="txt">' +
                        '<span class="txt1"><span class="check"></span></span>' +
                        '<span class="txt2">' +
                        //name
                        '<span class="name">' +
                        selectCar[c].name +
                        '</span>' +
                        //price
                        '<span class="price">' +
                        'Giá từ: ' + priceStr +
                        '</span>' +
                        '</span>' +
                        '</span>' +
                        '</label>' +
                        '</div></div>' +
                        '<p class="name hide">' + selectCar[c].name + '</p>' +
                        '</li>';


                    //str += '<li class="item" style="display: none">' +
                    //    '<div class="inner">' +
                    //    '<div class="img">' +
                    //    '<a>' +
                    //    "<img class='lazy' src='/Content/images/loader.gif' data-original='" +
                    //    selectCar[c].image +
                    //    "'/>" +
                    //    '</a>' +
                    //    '</div>' +
                    //    '<div class="txt">' +
                    //    '<p class="sm_checkbox">' +
                    //    '<input checked type="checkbox" data-url="' +
                    //    selectCar[c].url +
                    //    '" data-image="' +
                    //    selectCar[c].image +
                    //    '" data-catid="' +
                    //    selectCar[c].catid +
                    //    '" data-caturl="' +
                    //    selectCar[c].caturl +
                    //    '" data-name="' +
                    //    selectCar[c].name +
                    //    '" data-price="' +
                    //    selectCar[c].price +
                    //    '" data-idCar="' +
                    //    (selectCar[c].idcar) +
                    //    '" class="checkCarToolCompare" id="checkbox-0' +
                    //    (selectCar[c].idcar) +
                    //    '">' +
                    //    '<label for="checkbox-0' +
                    //    (selectCar[c].idcar) +
                    //    '">' +
                    //    selectCar[c].name +
                    //    '</label>' +
                    //    '</p>' +
                    //    '<p class="name hide">' +
                    //    selectCar[c].name +
                    //    '</p>' +
                    //    '<p class="price"><span>' +
                    //    selectCar[c].price +
                    //    '</span> <sup>' +
                    //    money +
                    //    '</sup></p></div></div></li>';
                }

                $("#ulSlideMobile").fadeIn(200,
                    function() {
                        $(str).appendTo("#ulSlideMobile");

                        $("img.lazy").lazyload({
                            effect: "fadeIn",
                            threshold: 200
                        });

                        $(".checkCarToolCompare").on("click",
                            function() {
                                var number = 3;
                                if ($("html").hasClass("tb") || $("html").hasClass("mb"))
                                    number = 2;
                                var t = $(".checkCarToolCompare:checked");
                                if (t.length > number)
                                    $(this).prop("checked", "");
                            });
                    });
            } else {
                for (var ci = 0; ci < selectCar.length; ci++) {
                    var priceZeroText = "Sẽ cập nhật sau";
                    var priceStr = '';
                    if (selectCar[ci].price == 0)
                        priceStr = '<span>' + priceZeroText + '</span>';
                    else
                        priceStr = '<span>' + selectCar[ci].price + '</span> <sup>' + money + '</sup>';

                    str += '' +
                        '<li class="item" style="display: none">' +
                        '<div class="inner">' +
                        '<div class="sm_checkbox">' +
                        '<input checked type="checkbox" data-url="' +
                        selectCar[ci].url +
                        '" data-image="' +
                        selectCar[ci].image +
                        '" data-catid="' +
                        selectCar[ci].catid +
                        '" data-name="' +
                        selectCar[ci].name +
                        '" data-price="' +
                        selectCar[ci].price +
                        '" data-idCar="' +
                        (selectCar[ci].idcar) +
                        '" class="checkCarToolCompare" id="checkbox-0' +
                        (selectCar[ci].idcar) +
                        '">' +
                        '<label for="checkbox-0' +
                        (selectCar[ci].idcar) +
                        '">' +
                        //lbl
                        '<label for="checkbox-0' + (selectCar[ci].idcar) + '">' +
                        //img
                        '<span class="img">' +
                        "<img class='lazy' src='/Content/images/loader.gif' data-original='" + selectCar[ci].image + "'/>" +
                        '</span>' +
                        //content
                        '<span class="txt">' +
                        '<span class="txt1"><span class="check"></span></span>' +
                        '<span class="txt2">' +
                        //name
                        '<span class="name">' +
                        selectCar[ci].name +
                        '</span>' +
                        //price
                        '<span class="price">' +
                        'Giá từ: ' + priceStr +
                        '</span>' +
                        '</span>' +
                        '</span>' +
                        '</label>' +
                        '</div></div>' +
                        '<p class="name hide">' + selectCar[ci].name + '</p>' +
                        '</li>';

                    //str += '<li class="item" style="display: none">' +
                    //    '<div class="inner">' +
                    //    '<div class="img">' +
                    //    '<a>' +
                    //    "<img class='lazy' src='/Content/images/loader.gif' data-original='" +
                    //    selectCar[ci].image +
                    //    "'/>" +
                    //    '</a>' +
                    //    '</div>' +
                    //    '<div class="txt">' +
                    //    '<p class="sm_checkbox">' +
                    //    '<input checked type="checkbox" data-url="' +
                    //    selectCar[ci].url +
                    //    '" data-image="' +
                    //    selectCar[ci].image +
                    //    '" data-catid="' +
                    //    selectCar[ci].catid +
                    //    '" data-name="' +
                    //    selectCar[ci].name +
                    //    '" data-price="' +
                    //    selectCar[ci].price +
                    //    '" data-idCar="' +
                    //    (selectCar[ci].idcar) +
                    //    '" class="checkCarToolCompare" id="checkbox-0' +
                    //    (selectCar[ci].idcar) +
                    //    '">' +
                    //    '<label for="checkbox-0' +
                    //    (selectCar[ci].idcar) +
                    //    '">' +
                    //    selectCar[ci].name +
                    //    '</label>' +
                    //    '</p>' +
                    //    '<p class="name hide">' +
                    //    selectCar[ci].name +
                    //    '</p>' +
                    //    '<p class="price"><span>' +
                    //    selectCar[ci].price +
                    //    '</span> <sup>' +
                    //    money +
                    //    '</sup></p></div></div></li>';
                }

                $("#ulSlideMobile").fadeIn(200,
                    function() {
                        $(str).appendTo("#ulSlideMobile");

                        $("img.lazy").lazyload({
                            effect: "fadeIn",
                            threshold: 200
                        });

                        $(".checkCarToolCompare").on("click",
                            function() {
                                var number = 3;
                                if ($("html").hasClass("tb") || $("html").hasClass("mb"))
                                    number = 2;
                                var t = $(".checkCarToolCompare:checked");
                                if (t.length > number)
                                    $(this).prop("checked", "");
                            });
                    });
            }
            //$('html,body').animate({
            //    scrollTop: $("#content").offset().top
            //}, 'slow');
        }
    });
}

function postCompareClick(arrayFirst) {
    var t = "";
    for (var i = 0; i < arrayFirst.length; i++) {
        if (i < arrayFirst.length - 1)
            t += arrayFirst[i] + ",";
        else
            t += arrayFirst[i];
    }

    postUserClickTools(t, "SOSANHXEMOI");
}

function postCompareOldClick(arrayFirst) {
    var t = "";
    for (var i = 0; i < arrayFirst.length; i++) {
        if (i < arrayFirst.length - 1)
            t += arrayFirst[i] + ",";
        else
            t += arrayFirst[i];
    }

    postUserClickTools(t, "SOSANHXECU");
}
/*End of Compare Car */

/* Compare Old Car */
function processingToCompareOld($scope, $rootScope, $location, service, arrayFirst, $q) {
    $scope.CarLength = arrayFirst.length;
    $scope.CarCompares = [];
    // Get car information
    angular.forEach(arrayFirst, function(ele, index) {
        var val2 = service.GetNewsByIDInCompare(ele, $rootScope.DealerID);
        val2.then(function(results) {
            if (results.id !== 0) {
                var t = {
                    carId: results.id,
                    carUrl: (results.newS_URL === '' ? results.newS_SEO_URL : results.newS_URL),
                    carName: results.newS_TITLE,
                    carImg: "/data/news/" + results.id + "/" + results.newS_IMAGE3,
                    carPrice: formatMoney(results.newS_PRICE1 + ".000"),
                    catUrl: results.caT_SEO_URL,
                    checked: true,
                    lSummary: results.lNameDeclare
                };
                $scope.CarCompares.push(t);
            }
            if ($scope.CarCompares.length === arrayFirst.length) {
                CreateSummary_CompareOld($scope.CarCompares);


                // Analytics function
                var isCan = checkCanGetAPost("ciCompareOldCountperDay");
                if (isCan)
                    postCompareOldClick(arrayFirst);
            }
        });
    });
}

function ChangeListProductsToolOld_Compare() {
    var seoUrl = $("#hdSeoUrlTool").val();
    var dealerId = $("#hdIdlr").val();
    var api = $("#hdApiUrl").val();
    var price = getData("ckPriceToolOld");
    var year = getData("ckYear");
    var modelsCar = getData("ckModel");
    var style = getData("ckStyle");
    var fuel = getData("ckFuel");
    var mile = getData("ckMile");
    var branch = getData("ckBranch");

    var url = api + "/api/Detail/GetListProductOld?sPage=0" +
        "&_SeoUrl=" + seoUrl + "&idDlr=" + dealerId + "&sPrice=" + price +
        "&sYear=" + year + "&sModelsCar=" + modelsCar + "&sStyle=" + style + "&sFuel=" + fuel + "&sMileage=" + mile + "&iSort=" + "&branchId=" + branch;

    var awesomeToyota = toyotaDealerLog();
    var selectCar = getSelectCarCompareOld();
    var money = $("#hdMoneyUnit").val();
    $.ajax({
        type: "Get",
        url: url,
        headers: {
            'Authorization': 'X-XSRF-Token ' + awesomeToyota,
            'X-XSRF-Token': awesomeToyota,
            'Content-Type': 'application/json'
        },
        success: function(data) {
            var str = "";
            var countList = data.lModels.length;
            $("#ulSlideMobileCompareOld").fadeOut(200, function() {
                $("#ulSlideMobileCompareOld").empty();
            });
            if (countList > 0) {
                for (var j = 0; j < countList; j++) {
                    var mon = formatMoney(data.lModels[j].newS_PRICE1 + ".000");
                    var dataurl = data.lModels[j].newS_URL === "" ? data.lModels[j].newS_SEO_URL : data.lModels[j].newS_URL;
                    var check = false;
                    var priceZeroText = "Sẽ cập nhật sau";
                    var priceStr = '';
                    if (data.lModels[j].newS_PRICE1 == 0)
                        priceStr = '<span>' + priceZeroText + '</span>';
                    else
                        priceStr = '<span>' + mon + '</span> <sup>' + money + '</sup>';

                    for (var ce = 0; ce < selectCar.length; ce++) {
                        if (selectCar[ce].idcar == data.lModels[j].id) {
                            check = true;
                            selectCar.splice(ce, 1);
                        }
                    }

                    str += '' +
                        '<li class="item">' +
                        '<div class="inner">' +
                        '<div class="sm_checkbox">' +
                        '<input ' +
                        (check ? 'checked' : '') +
                        ' type="checkbox" data-url="' +
                        dataurl +
                        '" data-image="/data/news/' +
                        data.lModels[j].id +
                        '/' +
                        data.lModels[j].newS_IMAGE2 +
                        '" data-catid="' +
                        data.lModels[j].caT_ID +
                        '" data-name="' +
                        data.lModels[j].newS_TITLE +
                        '" data-price="' +
                        mon +
                        '" data-idcar="' +
                        (data.lModels[j].id) +
                        '" class="checkCarOldToolCompare" id="checkbox-0' +
                        (data.lModels[j].id) +
                        '">' +
                        //lbl
                        '<label for="checkbox-0' + (data.lModels[j].id) + '">' +
                        //img
                        '<span class="img">' +
                        "<img class='lazy' src='/Content/images/loader.gif' data-original='/data/news/" +
                        data.lModels[j].id +
                        "/" +
                        data.lModels[j].newS_IMAGE3 +
                        "?w=170&h=127&mode=crop'/>" +
                        '</span>' +
                        //content
                        '<span class="txt">' +
                        '<span class="txt1"><span class="check"></span></span>' +
                        '<span class="txt2">' +
                        //name
                        '<span class="name">' +
                        data.lModels[j].newS_TITLE +
                        '</span>' +
                        //price
                        '<span class="price">' + priceStr +
                        '</span>' +
                        '</span>' +
                        '</span>' +
                        '</label>' +
                        '</div></div>' +

                        '<p class="name hide"><a href="' +
                        (data.lModels[j].newS_URL === "" ? data.lModels[j].newS_SEO_URL : data.lModels[j].newS_URL) +
                        '">' +
                        data.lModels[j].newS_TITLE +
                        '</a></p>' +

                        '</li>';
                }
            }
            for (var ci = 0; ci < selectCar.length; ci++) {
                var priceZeroText = "Sẽ cập nhật sau";
                var priceStr = '';
                if (selectCar[ci].price == 0)
                    priceStr = '<span>' + priceZeroText + '</span>';
                else
                    priceStr = '<span>' + selectCar[ci].price + '</span> <sup>' + money + '</sup>';

                str += '' +
                    '<li class="item" style="display: none">' +
                    '<div class="inner">' +
                    '<div class="sm_checkbox">' +
                    '<input checked type="checkbox" data-url="' +
                    selectCar[ci].url +
                    '" data-image="' +
                    selectCar[ci].image +
                    '" data-catid="' +
                    selectCar[ci].catid +
                    '" data-name="' +
                    selectCar[ci].name +
                    '" data-price="' +
                    selectCar[ci].price +
                    '" data-idCar="' +
                    (selectCar[ci].idcar) +
                    '" class="checkCarToolCompare" id="checkbox-0' +
                    (selectCar[ci].idcar) +
                    '">' +
                    '<label for="checkbox-0' +
                    (selectCar[ci].idcar) +
                    '">' +
                    //lbl
                    '<label for="checkbox-0' + (selectCar[ci].idcar) + '">' +
                    //img
                    '<span class="img">' +
                    "<img class='lazy' src='/Content/images/loader.gif' data-original='" + selectCar[ci].image + "'/>" +
                    '</span>' +
                    //content
                    '<span class="txt">' +
                    '<span class="txt1"><span class="check"></span></span>' +
                    '<span class="txt2">' +
                    //name
                    '<span class="name">' +
                    selectCar[ci].name +
                    '</span>' +
                    //price
                    '<span class="price">' + priceStr +
                    '</span>' +
                    '</span>' +
                    '</span>' +
                    '</label>' +
                    '</div></div>' +
                    '<p class="name hide">' + selectCar[ci].name + '</p>' +
                    '</li>';

            }
            $("#ulSlideMobileCompareOld").fadeIn(200, function() {
                $(str).appendTo("#ulSlideMobileCompareOld");
                $("img.lazy").lazyload({
                    effect: "fadeIn",
                    threshold: 200
                });
                $(".checkCarOldToolCompare").on("click", function() {
                    var number = 3;
                    if ($("html").hasClass("mobile"))
                        number = 2;
                    var t = $(".checkCarOldToolCompare:checked");
                    if (t.length > number)
                        $(this).prop("checked", "");
                });
            });

        }
    });
}

function CreateSummary_CompareOld(array) {
    $("#tbodyTongQuan").empty();
    var str = "";
    var arraySum = [];
    for (var tj = 0; tj < array.length; tj++) {
        if (array[tj].lSummary != undefined && array[tj].lSummary.length > 0) {
            arraySum = array[tj].lSummary;
            break;
        }
    }
    if (arraySum != undefined && arraySum.length > 0) {
        var classtq = "";
        for (var i = 0; i < arraySum.length; i++) {
            classtq = "tqtablelst" + i;
            str += '<tr><td class="rowlst tqrowlst">' +
                (arraySum[i].decL_DESC == undefined ? "" : arraySum[i].decL_DESC) +
                '</td><td></td><td></td><td><table><tbody><tr class=' + classtq + '>';
            for (var j = 0; j < array.length; j++) {
                if (array[j].lSummary[i] != undefined)
                    str += '<td style="font-weight: normal">' + array[j].lSummary[i].decL_NAME + '</td>';
                else
                    str += '<td style="font-weight: normal">-</td>';
            }
            str += '</tr></tbody></table></td></tr>';
        }
        $(str).appendTo("#tbodyTongQuan");

        var selectCar = getSelectCarCompareOld();
        var str2 = "";
        classtq = "tqtablelst" + arraySum.length ;
        str2 += '<tr><td class="rowlst tqrowlst">' +
            'Số Km' +
            '</td><td></td><td></td><td><table><tbody><tr class=' + classtq + '>';
        for (var j = 0; j < array.length; j++) {
            for (var z = 0; z < selectCar.length; z++) {
                if (array[j].carId == selectCar[z].idcar)
                    str2 += '<td style="font-weight: normal">' + selectCar[z].km.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</td>';
            }
        }
        str2 += '</tr></tbody></table></td></tr>';
        $(str2).appendTo("#tbodyTongQuan");
    }
}
/*End of Compare Car */
function getSelectCarCompare() {
    var cars = $(".checkCarToolCompare:checked");
    var lstCar = [];
    for (var t = 0; t < cars.length; t++) {
        var input = cars[t];
        var model = {
            idcar: $(input).data("idcar"),
            url: $(input).data("url"),
            image: $(input).data("image"),
            catid: $(input).data("catid"),
            name: $(input).data("name"),
            price: $(input).data("price")
        }
        lstCar.push(model);
    }
    return lstCar;
}

function getSelectCarCompareOld() {
    var cars = $(".checkCarOldToolCompare:checked");
    var lstCar = [];
    for (var t = 0; t < cars.length; t++) {
        var input = cars[t];
        var id = $(input).data("idcar");
        var model = {
            idcar: id,
            url: $(input).data("url"),
            image: $(input).data("image"),
            catid: $(input).data("catid"),
            name: $(input).data("name"),
            price: $(input).data("price"),
            km: $(input).data("km")
        }
        lstCar.push(model);
    }
    return lstCar;
}