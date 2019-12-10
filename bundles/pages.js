function setUpFormValidate() {
    var n = $("#hdIdlr").val();
    $(".btnResetForm").on("click", function() {
        EmptyFormbyReset($(this))
    });
    $("img#icpSent").on("load", function() {
        changeCapcha()
    });
    $("img#icpSentInfo").on("load", function() {
        changeCapcha()
    });
    $("#lien-he").validate({
        rules: {
            txtName: {
                required: !0,
                maxlength: 255
            },
            txtPhone: {
                phoneVN: !0,
                required: !0,
                minlength: 10
            }
        },
        submitHandler: function(t) {
            var u = $("#txtName").val(),
                f = $("#txtEmail").val(),
                i = $("#txtPhone").val(),
                e = "true" == $("#hdIsDealerSendMessage").val() ? "0" : $("#hdIsDealerSendMessage").val(),
                r;
            "0" == i.charAt(3) && (i = i.replace("+84", ""));
            r = $("#txtContent").val();
            angular.element($(".btnopenMessageFromHome")).scope().PostContact(u, f, i, "", r, n, e);
            EmptyFormbySubmit(t)
        },
        highlight: function(n) {
            HighLightError(n)
        },
        success: function(n) {
            RemoveHighlight(n)
        },
        errorPlacement: function(n, t) {
            ShowErrorByLabel(n, t)
        }
    });
    $("#sendMessageFromDetailProduct").validate({
        rules: {
            txtNamePro: {
                required: !0,
                maxlength: 255
            },
            txtPhonePro: {
                phoneVN: !0,
                required: !0,
                minlength: 10
            }
        },
        submitHandler: function(t) {
            var r = $("#txtNamePro").val(),
                u = $("#txtEmailPro").val(),
                i = $("#txtPhonePro").val();
            "0" == i.charAt(3) && (i = i.replace("+84", ""));
            var f = $("#txtContentPro").val(),
                e = $("#spTitleCar").text(),
                o = $("#hdCarId").val(),
                s = $(".branchProDetail:checked").data("idbranch");
            angular.element($(".btnSendMSProduct")).scope().PostContactDetailProduct(r, u, i, "", f, e, o, n, s);
            EmptyFormbySubmit(t)
        },
        highlight: function(n) {
            HighLightError(n)
        },
        success: function(n) {
            RemoveHighlight(n)
        },
        errorPlacement: function(n, t) {
            ShowErrorByLabel(n, t)
        }
    });
    $("#sendMessageFromDetailProductOld").validate({
        rules: {
            txtNameOld: {
                required: !0,
                maxlength: 255
            },
            txtPhoneOld: {
                phoneVN: !0,
                required: !0,
                minlength: 10
            }
        },
        submitHandler: function(t) {
            var r = $("#txtNameOld").val(),
                u = $("#txtEmailOld").val(),
                i = $("#txtPhoneOld").val();
            "0" == i.charAt(3) && (i = i.replace("+84", ""));
            var f = $("#txtContentOld").val(),
                e = $("#hdTitleOld").val(),
                o = $("#hdIdOld").val(),
                s = $(".branchOldDetail:checked").data("idbranch");
            angular.element($(".btnSendMSOld")).scope().PostContactDetailProductOld(r, u, i, "", f, e, o, n, s);
            EmptyFormbySubmit(t)
        },
        highlight: function(n) {
            HighLightError(n)
        },
        success: function(n) {
            RemoveHighlight(n)
        },
        errorPlacement: function(n, t) {
            ShowErrorByLabel(n, t)
        }
    });
    $("#sendMessageStaff").validate({
        rules: {
            txtNameStaff: {
                required: !0,
                maxlength: 255
            },
            txtPhoneStaff: {
                phoneVN: !0,
                required: !0,
                minlength: 10
            }
        },
        submitHandler: function(t) {
            var r = $("#txtNameStaff").val(),
                u = $("#txtEmailStaff").val(),
                i = $("#txtPhoneStaff").val();
            "0" == i.charAt(3) && (i = i.replace("+84", ""));
            var f = $("#txtContentStaff").val(),
                e = $("#hdStaffEmail").val(),
                o = $("#spStaffName").text();
            angular.element($(".btnSend")).scope().PostMessageContactStaff(r, u, i, "", f, e, o, n);
            EmptyFormbySubmit(t)
        },
        highlight: function(n) {
            HighLightError(n)
        },
        success: function(n) {
            RemoveHighlight(n)
        },
        errorPlacement: function(n, t) {
            ShowErrorByLabel(n, t)
        }
    });
    $("#testDriveInTools").validate({
        submitHandler: function() {
            var u = "",
                e = "",
                v, l, b;
            $("#tab_testdrive_01 .chkCats:checked").each(function() {
                u += $(this).data("idcat") + ",";
                e += $(this).data("namecat") + ","
            });
            u = u.replace(/,$/, "");
            e = e.replace(/,$/, "");
            var a = $("#inputDate").val(),
                r = a.split("/"),
                t = r[0],
                i = r[1],
                f = r[2];
            CheckIfIsMobile() && (t = (r = a.split("-"))[2], i = r[1], f = r[0]);
            v = (parseInt(i) < 10 ? "0" + parseInt(i) : parseInt(i)) + "/" + (parseInt(t) < 10 ? "0" + parseInt(t) : parseInt(t)) + "/" + parseInt(f);
            $("#spDate").text((parseInt(t) < 10 ? "0" + parseInt(t) : parseInt(t)) + "." + (parseInt(i) < 10 ? "0" + parseInt(i) : parseInt(i)) + "." + parseInt(f));
            $("#spDate").text((parseInt(t) < 10 ? "0" + parseInt(t) : parseInt(t)) + "." + (parseInt(i) < 10 ? "0" + parseInt(i) : parseInt(i)) + "." + parseInt(f));
            var y = $("#inputNote").val(),
                s = $("#ddlTitle").val(),
                h = $("#inputName").val(),
                p = $("#inputLastName").val(),
                w = $("#timePicker").val(),
                c = $("#inputPhone").val(),
                o = $("#inputEmail").val();
            o.length < 3 ? $("#showsentmail").text("") : $("#noshowsentmail").text("");
            l = $("#ddlAdrress").val();
            ($(".fullname").text(s + " " + p + " " + h), $(".phone").text(c.toLowerCase()), $(".email").text(o.toLowerCase()), $(".mauxe").text(e), $(".address").text(l), $(".ghichu").text(y), CheckValueTestDrive(u, t, i, f, w, s, h, o, c)) && (0 < $("#chkHaveLicense:checkbox:checked").length ? ($(".testdrive_tabs .complete").removeClass("disabled"), $(".testdrive_tabs .tab").removeClass("active"), $(".testdrive_tabs .tab").find("a").removeClass("active"), $(".testdrive_tabs .complete").find("a").addClass("active"), $(".testdrive_tabs .content-tab").css("display", "none"), $("#tab_testdrive_04").css("display", "block"), b = $("#ddlAdrress").find("option:selected").attr("data-branchid"), angular.element($(".btnSend")).scope().PostTestDrive(u, s, p, h, o, c, v, w, y, l, n, b)) : showErrorbyAlert("Đăng ký lái thử", "<p>Xin vui lòng chọn ô Tôi đã có giấy phép lái xe ô tô hợp lệ!<\/p>", ""))
        },
        highlight: function(n) {
            HighLightError(n)
        },
        success: function(n) {
            RemoveHighlight(n)
        },
        errorPlacement: function() {}
    });
    $("#Estimate").validate({
        submitHandler: function() {
            var r = "";
            $("#tab_testdrive_01 .chkCats:checked").each(function() {
                r += $(this).data("idcat") + ","
            });
            r = r.replace(/,$/, "");
            var f = $("#inputDate").val().split("/"),
                t = f[0],
                i = f[1],
                u = f[2],
                l = (parseInt(i) < 10 ? "0" + parseInt(i) : parseInt(i)) + "/" + (parseInt(t) < 10 ? "0" + parseInt(t) : parseInt(t)) + "/" + parseInt(u);
            $("#spDate").text((parseInt(t) < 10 ? "0" + parseInt(t) : parseInt(t)) + "." + (parseInt(i) < 10 ? "0" + parseInt(i) : parseInt(i)) + "." + parseInt(u));
            $("#spDate").text((parseInt(t) < 10 ? "0" + parseInt(t) : parseInt(t)) + "." + (parseInt(i) < 10 ? "0" + parseInt(i) : parseInt(i)) + "." + parseInt(u));
            var e = $("#inputPhone").val(),
                o = $("#inputEmail").val(),
                a = $("#inputNote").val(),
                s = $("#ddlTitle").val(),
                h = $("#inputName").val(),
                v = $("#inputLastName").val(),
                c = $("#timePicker").val();
            CheckValueTestDrive(r, t, i, u, c, s, h, o, e) && (0 < $("#chkHaveLicense:checkbox:checked").length ? ($(".testdrive_tabs .complete").removeClass("disabled"), $(".testdrive_tabs .tab").removeClass("active"), $(".testdrive_tabs .tab").find("a").removeClass("active"), $(".testdrive_tabs .complete").find("a").addClass("active"), $(".testdrive_tabs .content-tab").css("display", "none"), $("#tab_testdrive_04").css("display", "block"), angular.element($(".btnSend")).scope().PostTestDrive(r, s, v, h, o, e, l, c, a, n)) : showErrorbyAlert("Đăng ký lái thử", "<p>Bạn chưa có giấy phép lái xe ô tô hợp lệ?<p><p>Chúng tôi sẽ không thể tiếp tục việc đăng ký!<\/p>", ""))
        },
        highlight: function(n) {
            HighLightError(n)
        },
        success: function(n) {
            RemoveHighlight(n)
        },
        errorPlacement: function() {}
    });
    $("#SeviceRegisterInTools").validate({
        rules: {},
        submitHandler: function() {
            var e = "",
                s = $("#tab_dangkydichvu_01 .chkCats:checked").length,
                nt = 0,
                it, d, g, et;
            0 < s && (1 == s ? e = $("#tab_dangkydichvu_01 .chkCats:checked").data("name") : $("#tab_dangkydichvu_01 .chkCats:checked").each(function() {
                e += 0 < s && nt == s - 1 ? $(this).data("name") : $(this).data("name") + ", ";
                nt += 1
            }));
            var tt = $("#inputDate").val(),
                f = tt.split("/"),
                t = f[0],
                i = f[1],
                o = f[2];
            CheckIfIsMobile() && (t = (f = tt.split("-"))[2], i = f[1], o = f[0]);
            it = (parseInt(i) < 10 ? "0" + parseInt(i) : parseInt(i)) + "/" + (parseInt(t) < 10 ? "0" + parseInt(t) : parseInt(t)) + "/" + parseInt(o);
            $("#spDate").text((parseInt(t) < 10 ? "0" + parseInt(t) : parseInt(t)) + "." + (parseInt(i) < 10 ? "0" + parseInt(i) : parseInt(i)) + "." + parseInt(o));
            $("#spDate").text((parseInt(t) < 10 ? "0" + parseInt(t) : parseInt(t)) + "." + (parseInt(i) < 10 ? "0" + parseInt(i) : parseInt(i)) + "." + parseInt(o));
            var l = "20/06/1989".split("/"),
                r = l[0],
                u = l[1],
                a = l[2],
                ot = (parseInt(u) < 10 ? "0" + parseInt(u) : parseInt(u)) + "/" + (parseInt(r) < 10 ? "0" + parseInt(r) : parseInt(r)) + "/" + parseInt(a);
            $("#spDate2").text((parseInt(r) < 10 ? "0" + parseInt(r) : parseInt(r)) + "." + (parseInt(u) < 10 ? "0" + parseInt(u) : parseInt(u)) + "." + parseInt(a));
            $("#spDate2").text((parseInt(r) < 10 ? "0" + parseInt(r) : parseInt(r)) + "." + (parseInt(u) < 10 ? "0" + parseInt(u) : parseInt(u)) + "." + parseInt(a));
            var rt = $("#inputNote").val(),
                v = $("#ddlTitle").val(),
                y = $("#inputName").val(),
                ut = $("#inputLastName").val(),
                ft = $("#hourPicker").val(),
                p = $("#inputLicenseCar").val().toUpperCase(),
                h = $("#selectModelCar").val(),
                w = $("#selectCats").val(),
                b = $("#inputYearCar").val(),
                k = $("#inputPhone").val(),
                c = $("#inputEmail").val();
            c.length < 3 ? $("#showsentmail").text("") : $("#noshowsentmail").text("");
            d = $("#ddlAdrress").val();
            g = $("#inputEmployer").val();
            ($(".fullname").text(v + " " + ut + " " + y), $(".phone").text(k.toLowerCase()), $(".email").text(c.toLowerCase()), $(".dichvu").text(e), $(".phienban").text(h), $(".mauxe").text(w), $(".address").text(d), $(".employer").text(g), $(".bienso").text(p), $(".namsx").text(b), $(".ghichu").text(rt), CheckValueServiceRegister(e, t, i, o, ft, v, y, c, k, p, h, b, h, w)) && ($(".page_dangkydichvu .tab").removeClass("active"), $(".page_dangkydichvu .tab").find("a").removeClass("active"), $(".page_dangkydichvu .content-tab").css("display", "none"), $(".page_dangkydichvu .tab").addClass("disabled"), $(".page_dangkydichvu .complete").removeClass("disabled"), $(".page_dangkydichvu .complete").find("a").addClass("active"), $("#tab_dangkydichvu_04").css("display", "block"), et = $("#ddlAdrress").find("option:selected").attr("data-branchid"), angular.element($(".btnSend")).scope().PostRegisterService(e, v, ut, y, c, k, it, ot, ft, "10", rt, p, h, w, b, d, g, n, et))
        },
        highlight: function(n) {
            HighLightError(n)
        },
        success: function(n) {
            RemoveHighlight(n)
        },
        errorPlacement: function() {}
    });
    $("#frmSendMailTools").validate({
        rules: {
            txtEmail_frmSendEmail: {
                required: !0,
                email: !0
            }
        },
        submitHandler: function(n) {
            var t = $("#txtFullName_frmSendEmail").val(),
                i = $("#txtEmail_frmSendEmail").val();
            switch ($(n).data("target")) {
                case "DUTOANCHIPHI":
                    postMailEstimate(t, i);
                    break;
                case "SOSANHXEMOI":
                    postMailCompare(t, i);
                    break;
                case "HOTROTAICHINH":
                    postMailSupportFinance(t, i);
                    break;
                case "SOSANHXECU":
                    postMailCompareOld(t, i)
            }
            EmptyFormbySubmit(n)
        },
        highlight: function(n) {
            HighLightError(n)
        },
        success: function(n) {
            RemoveHighlight(n)
        },
        errorPlacement: function(n, t) {
            ShowErrorByLabel(n, t)
        }
    });
    $("#dang-ky-nhan-tin").validate({
        rules: {
            txtName_GetNews: {
                required: !0
            },
            txtEmail_GetNews: {
                required: !0,
                email: !0
            }
        },
        submitHandler: function(t) {
            var i = $("#txtName_GetNews").val(),
                r = $("#txtEmail_GetNews").val();
            angular.element($(".btnGetNews")).scope().PostMailReceive(i, r, n);
            EmptyFormbySubmit(t)
        },
        highlight: function(n) {
            HighLightError(n)
        },
        success: function(n) {
            RemoveHighlight(n)
        },
        errorPlacement: function(n, t) {
            ShowErrorByLabel(n, t)
        }
    });
    $(".btnSendEmail").on("click", function() {
        var n = $(this).data("target");
        $("#frmSendMailTools").data("target", n)
    })
}

function EmptyFormbyReset(n) {
    var t = $(n).closest("form"),
        i;
    void 0 !== t && ($(t).find("input[type='text'],input[type='email'],input[type='password'],textarea").empty(), $(t).find("input[type='checkbox']").prop("checked", !1), $(t).find("label").removeClass("active"), $(t).find("input:text").first().focus(), i = $(t).find("a.idRefesh").first(), void 0 !== i && $(i).click())
}

function EmptyFormbySubmit(n) {
    $(n).find("input[type='text'],input[type='email'],input[type='password'],textarea").val("");
    $(n).find("input[type='checkbox']").prop("checked", !1);
    $(n).find("label").removeClass("active");
    $(n).find("input:text").first().focus();
    var t = $(n).find("a.idRefesh").first();
    void 0 !== t && $(t).click()
}

function validateEmail(n) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(n)
}

function validatePhone(n) {
    return n = n.replace(/\+84+/g, "").replace(/\_+/g, "").replace(/\(+/g, "").replace(/\)+/g, "").replace(/\s+/g, ""), /^[\d]{8,12}$/.test(n)
}

function CatpcSent(n) {
    var t = document.getElementById(n),
        i = Math.random();
    t.src = "/Content/capcha/captchr.ashx?query=" + i
}

function changeCapcha() {
    var n;
    n = getCookie("slmsrcd1");
    $("#hdCatpcha").val(n)
}

function getCookie(n) {
    for (var t, r = n + "=", u = document.cookie.split(";"), i = 0; i < u.length; i++) {
        for (t = u[i];
            " " == t.charAt(0);) t = t.substring(1);
        if (0 == t.indexOf(r)) return t.substring(r.length, t.length)
    }
    return ""
}

function keycodePhone() {
    $("#txtPhone").keypress(function(n) {
        var t = n.keyCode || n.which,
            i = String.fromCharCode(t);
        8 !== t && 27 !== t && 46 !== t && 39 !== t && 37 !== t && (/^(0)[0-9]{10}$/.test(i) || (n.returnValue = !1, n.preventDefault && n.preventDefault()))
    })
}

function ucwords(n) {
    return (n + "").replace(/^([a-z])|\s+([a-z])/g, function(n) {
        return n.toUpperCase()
    })
}

function capitalizeFirstLetter(n) {
    return n[0].toUpperCase() + n.slice(1)
}

function capitalizeFirstLetter(n) {
    return n.charAt(0).toUpperCase() + n.slice(1)
}

function capitalizeFirstLetter(n) {
    return n.replace(/^./, n[0].toUpperCase())
}

function HighLightError(n) {
    $(n).hasClass("frmError_Validate") || $(n).addClass("frmError_Validate");
    var t = $("label[for=" + $(n).attr("id") + "]")[0];
    void 0 !== t && ($(t).hasClass("frmError_Validate") || $(t).addClass("frmError_Validate"))
}

function RemoveHighlight(n) {
    var i = document.getElementsByName(n[0].htmlFor),
        r, t;
    void 0 !== i[0] && $(i[0]).hasClass("frmError_Validate") && $(i[0]).removeClass("frmError_Validate");
    r = n[0].htmlFor;
    t = $("label[for=" + r + "]")[0];
    void 0 !== t && ($(t).text($(t).attr("data-holderOriginal")), $(t).hasClass("frmError_Validate") && $(t).removeClass("frmError_Validate"))
}

function ShowErrorByLabel(n, t) {
    var r = $(n).text(),
        i = $("label[for=" + $(t).attr("id") + "]");
    void 0 !== i && (-1 !== r.indexOf("Vui") ? $(i).text($(n).text() + " " + $(i).data("holderoriginal")) : $(i).text($(n).text()))
}

function showErrorbyAlert(n, t, i) {
    swal({
        title: n,
        text: t,
        showCancelButton: !1,
        confirmButtonText: "x",
        html: !0,
        closeOnConfirm: !0
    }, function() {
        $("#" + i).focus()
    })
}

function showSuccessbyAlert(n, t) {
    swal({
        title: n,
        text: t,
        showCancelButton: !1,
        confirmButtonText: "x",
        html: !0,
        closeOnConfirm: !0
    })
}

function CheckValue01TestDrive() {
    var n = "";
    return $("#tab_testdrive_01 .chkCats:checked").each(function() {
        n += $(this).data("idcat") + ","
    }), "" != (n = n.replace(/,$/, "")) || (showErrorbyAlert("Đăng ký lái thử", "<p>Vui lòng chọn tối thiểu 1 mẫu xe!", ""), $(".page_testdrive .tab").find("a").removeClass("active"), $(".page_testdrive .selectCar").find("a").addClass("active"), $(".page_testdrive .content-tab").css("display", "none"), $("#tab_testdrive_01").css("display", "block"), !1)
}

function CheckValue02TestDrive() {
    var h = $("#inputDate").val(),
        r = h.split("/"),
        u = r[0],
        t = r[1],
        n = r[2],
        c = $("#timePicker").val(),
        s;
    if (CheckIfIsMobile() && (u = (r = h.split("-"))[2], t = r[1], n = r[0]), "" == u || "" == t || "" == n) return showErrorbyAlert("Đăng ký lái thử", "<p>Vui lòng chọn ngày dự kiến!<p>", "inputDate"), $(".page_testdrive .tab").find("a").removeClass("active"), $("a[href*='tab_testdrive_02']").addClass("active"), $(".page_testdrive .content-tab").css("display", "none"), $("#tab_testdrive_02").css("display", "block"), $("#inputDate").focus(), !1;
    var i = new Date,
        e = i.getDate(),
        o = i.getMonth() + 1,
        f = i.getFullYear(),
        l = i.getHours(),
        a = i.getMinutes();
    return (15 == l && 15 < a || 15 < l) && (i.setDate(i.getDate() + 1), e += 1, n < f || (f = n && t < o) || (f = n && o == t && u < e)) ? (showErrorbyAlert("Đăng ký lái thử", "<p>Ngày dự kiến phải lớn hơn ngày hiện tại!<p>", ""), $(".page_testdrive .tab").find("a").removeClass("active"), $("a[href*='tab_testdrive_02']").addClass("active"), $(".page_testdrive .content-tab").css("display", "none"), $("#tab_testdrive_02").css("display", "block"), $("#inputDate").focus(), !1) : n <= f && t <= o && u < e ? (showErrorbyAlert("Đăng ký lái thử", "<p>Ngày dự kiến phải lớn hơn hoặc bằng ngày hiện tại!<p>", ""), $(".page_testdrive .tab").find("a").removeClass("active"), $("a[href*='tab_testdrive_02']").addClass("active"), $(".page_testdrive .content-tab").css("display", "none"), $("#tab_testdrive_02").css("display", "block"), $("#inputDate").focus(), !1) : 31 < parseInt(u) || parseInt(u) < 1 || 12 < parseInt(t) || 4 < n.length || parseInt(t) < 1 || parseInt(n) < 1 ? (showErrorbyAlert("Đăng ký lái thử", "<p>Ngày dự kiến chưa đúng!<p>", "inputDate"), $(".page_testdrive .tab").find("a").removeClass("active"), $("a[href*='tab_testdrive_02']").addClass("active"), $(".page_testdrive .content-tab").css("display", "none"), $("#tab_testdrive_02").css("display", "block"), $("#inputDate").focus(), !1) : "0" == c || null == c ? (showErrorbyAlert("Đăng ký lái thử", "<p>Vui lòng chọn thời gian dự kiến!<p>", "timePicker"), $(".page_testdrive .tab").find("a").removeClass("active"), $("a[href*='tab_testdrive_02']").addClass("active"), $(".page_testdrive .content-tab").css("display", "none"), $("#tab_testdrive_02").css("display", "block"), $("#timePicker").focus(), !1) : (s = $("#ddlAdrress").val(), "" !== s && null != s || (showErrorbyAlert("Đăng ký lái thử", "<p>Vui lòng chọn địa điểm", ""), $(".page_testdrive .tab").find("a").removeClass("active"), $("a[href*='tab_testdrive_02']").addClass("active"), $(".page_testdrive .content-tab").css("display", "none"), $("#tab_testdrive_02").css("display", "block"), $("#ddlAdrress").focus(), !1))
}

function CheckValue03TestDrive() {
    var t = $("#inputPhone").val(),
        n = ($("#inputEmail").val(), $("#inputNote").val(), $("#ddlTitle").val()),
        i = $("#inputName").val();
    return $("#inputLastName").val(), "" === n || null == n ? (showErrorbyAlert("Đăng ký lái thử", "<p>Vui lòng chọn danh xưng<p>", "ddlTitle"), $(".page_testdrive .tab").find("a").removeClass("active"), $("a[href*='tab_testdrive_03']").addClass("active"), $(".page_testdrive .content-tab").css("display", "none"), $("#tab_testdrive_03").css("display", "block"), $("#ddlTitle").focus(), !1) : "" == i ? (showErrorbyAlert("Đăng ký lái thử", "<p>Vui lòng nhập tên<p>", "inputName"), $(".page_testdrive .tab").find("a").removeClass("active"), $("a[href*='tab_testdrive_03']").addClass("active"), $(".page_testdrive .content-tab").css("display", "none"), $("#tab_testdrive_03").css("display", "block"), $("#inputName").focus(), !1) : !!validatePhone(t) || (showErrorbyAlert("Đăng ký lái thử", "<p>Vui lòng nhập số điện thoại đúng!<p>", "inputPhone"), $(".page_testdrive .tab").find("a").removeClass("active"), $("a[href*='tab_testdrive_03']").addClass("active"), $(".page_testdrive .content-tab").css("display", "none"), $("#tab_testdrive_03").css("display", "block"), $("#inputPhone").focus(), !1)
}

function CheckValueTestDrive(n, t, i, r, u, f, e, o, s) {
    return "" == n ? (showErrorbyAlert("Đăng ký lái thử", "<p>Vui lòng chọn tối đa 3 mẫu xe!", ""), $(".page_testdrive .tab").find("a").removeClass("active"), $(".selectCar").find("a").addClass("active"), $(".page_testdrive .content-tab").css("display", "none"), $("#tab_testdrive_01").css("display", "block"), !1) : "" == t || "" == i || "" == r ? (showErrorbyAlert("Đăng ký lái thử", "<p>Vui lòng chọn ngày dự kiến!<p>", "inputDate"), $(".page_testdrive .tab").find("a").removeClass("active"), $("a[href*='tab_testdrive_02']").addClass("active"), $(".page_testdrive .content-tab").css("display", "none"), $("#tab_testdrive_02").css("display", "block"), $("#inputDate").focus(), !1) : 31 < parseInt(t) || parseInt(t) < 1 || 12 < parseInt(i) || 4 < r.length || parseInt(i) < 1 || parseInt(r) < 1 ? (showErrorbyAlert("Đăng ký lái thử", "<p>Ngày dự kiến chưa đúng!<p>", "inputDate"), $(".page_testdrive .tab").find("a").removeClass("active"), $("a[href*='tab_testdrive_02']").addClass("active"), $(".page_testdrive .content-tab").css("display", "none"), $("#tab_testdrive_02").css("display", "block"), $("#inputDate").focus(), !1) : "0" == u || null == u ? (showErrorbyAlert("Đăng ký lái thử", "<p>Vui lòng chọn thời gian dự kiến!<p>", "timePicker"), $(".page_testdrive .tab").find("a").removeClass("active"), $("a[href*='tab_testdrive_02']").addClass("active"), $(".page_testdrive .content-tab").css("display", "none"), $("#tab_testdrive_02").css("display", "block"), $("#timePicker").focus(), !1) : "" === f || null == f ? (showErrorbyAlert("Đăng ký lái thử", "<p>Vui lòng chọn danh xưng<p>", "ddlTitle"), $(".page_testdrive .tab").find("a").removeClass("active"), $("a[href*='tab_testdrive_03']").addClass("active"), $(".page_testdrive .content-tab").css("display", "none"), $("#tab_testdrive_03").css("display", "block"), $("#ddlTitle").focus(), !1) : "" == e ? (showErrorbyAlert("Đăng ký lái thử", "<p>Vui lòng nhập tên<p>", "inputName"), $(".page_testdrive .tab").find("a").removeClass("active"), $("a[href*='tab_testdrive_03']").addClass("active"), $(".page_testdrive .content-tab").css("display", "none"), $("#tab_testdrive_03").css("display", "block"), $("#inputName").focus(), !1) : !!validatePhone(s) || (showErrorbyAlert("Đăng ký lái thử", "<p>Vui lòng nhập số điện thoại đúng!<p>", "inputPhone"), $(".page_testdrive .tab").find("a").removeClass("active"), $("a[href*='tab_testdrive_03']").addClass("active"), $(".page_testdrive .content-tab").css("display", "none"), $("#tab_testdrive_03").css("display", "block"), $("#inputPhone").focus(), !1)
}

function CheckValue01ServiceRegister() {
    var n = $("#tab_dangkydichvu_01 .chkCats:checked").data("name");
    return "" != n && null != n && null != n || (showErrorbyAlert("Đặt lịch hẹn dịch vụ", "<p>Vui lòng chọn 1 dịch vụ!<p>", ""), $(".page_dangkydichvu .tab").find("a").removeClass("active"), $(".selectService").find("a").addClass("active"), $(".page_dangkydichvu .content-tab").css("display", "none"), $("#tab_dangkydichvu_01").css("display", "block"), !1)
}

function CheckValue02ServiceRegister() {
    var s = $("#inputDate").val(),
        t = s.split("/"),
        r = t[0],
        i = t[1],
        n = t[2],
        e, o, c;
    if (CheckIfIsMobile() && (r = (t = s.split("-"))[2], i = t[1], n = t[0]), "" == r || "" == i || "" == n) return showErrorbyAlert("Đặt lịch hẹn dịch vụ", "<p>Vui lòng chọn ngày dự kiến!<p>", ""), $(".page_dangkydichvu .tab").find("a").removeClass("active"), $("a[href*='tab_dangkydichvu_02']").addClass("active"), $(".page_dangkydichvu .content-tab").css("display", "none"), $("#tab_dangkydichvu_02").css("display", "block"), $("#inputDate").focus(), !1;
    var u = new Date,
        l = u.getDate(),
        h = u.getMonth() + 1,
        f = u.getFullYear();
    return (u.getHours(), u.getMinutes(), n < f || (f = n && i < h) || (f = n && h == i && r < l)) ? (showErrorbyAlert("Đặt lịch hẹn dịch vụ", "<p>Ngày dự kiến phải lớn hơn hoặc bằng ngày hiện tại!<p>", ""), $(".page_dangkydichvu .tab").find("a").removeClass("active"), $("a[href*='tab_dangkydichvu_02']").addClass("active"), $(".page_dangkydichvu .content-tab").css("display", "none"), $("#tab_dangkydichvu_02").css("display", "block"), $("#inputDate").focus(), !1) : (e = $("#hourPicker").val(), 31 < parseInt(r) || parseInt(r) < 1 || 12 < parseInt(i) || 4 < n.length || parseInt(i) < 1) ? (showErrorbyAlert("Đặt lịch hẹn dịch vụ", "<p>Ngày dự kiến chưa đúng!<p>", ""), $(".page_dangkydichvu .tab").find("a").removeClass("active"), $("a[href*='tab_dangkydichvu_02']").addClass("active"), $(".page_dangkydichvu .content-tab").css("display", "none"), $("#tab_dangkydichvu_02").css("display", "block"), $("#inputDate").focus(), !1) : "0" == e || null == e ? (showErrorbyAlert("Đặt lịch hẹn dịch vụ", "<p>Vui lòng chọn thời gian dự kiến!<p>", ""), $(".page_dangkydichvu .tab").find("a").removeClass("active"), $("a[href*='tab_dangkydichvu_02']").addClass("active"), $(".page_dangkydichvu .content-tab").css("display", "none"), $("#tab_dangkydichvu_02").css("display", "block"), $("#timePicker").focus(), !1) : (o = $("#ddlAdrress").val(), "" === o || null == o) ? (showErrorbyAlert("Đặt lịch hẹn dịch vụ", "<p>Vui lòng chọn địa điểm", ""), $(".page_dangkydichvu .tab").find("a").removeClass("active"), $("a[href*='tab_dangkydichvu_02']").addClass("active"), $(".page_dangkydichvu .content-tab").css("display", "none"), $("#tab_dangkydichvu_02").css("display", "block"), $("#ddlAdrress").focus(), !1) : (c = new Date, "" == n || !(parseInt(n) < 1950 || parseInt(n) > c.getFullYear()) || (showErrorbyAlert("Đặt lịch hẹn dịch vụ", "<p>Vui lòng nhập năm sản xuất<p> <i>(Từ 1950 đến nay)<\/i>", "inputYearCar"), $(".page_dangkydichvu .tab").find("a").removeClass("active"), $("a[href*='tab_dangkydichvu_03']").addClass("active"), $(".page_dangkydichvu .content-tab").css("display", "none"), $("#tab_dangkydichvu_03").css("display", "block"), $("#inputYearCar").focus(), !1))
}

function CheckValue03ServiceRegister() {
    var n = $("#inputPhone").val(),
        t = ($("#inputEmail").val(), $("#inputNote").val(), $("#ddlTitle").val()),
        r = $("#inputName").val(),
        i = ($("#inputLastName").val(), $("#inputLicenseCar").val());
    return $("#inputModelCar").val(), $("#selectCats").val(), $("#inputYearCar").val(), $("#ddlAdrress").find(":selected").data("name"), "" === t || null == t ? (showErrorbyAlert("Đặt lịch hẹn dịch vụ", "<p>Vui lòng chọn danh xưng<p>", ""), $(".page_dangkydichvu .tab").find("a").removeClass("active"), $("a[href*='tab_dangkydichvu_03']").addClass("active"), $(".page_dangkydichvu .content-tab").css("display", "none"), $("#tab_dangkydichvu_03").css("display", "block"), $("#ddlTitle").focus(), !1) : "" == r ? (showErrorbyAlert("Đặt lịch hẹn dịch vụ", "<p>Vui lòng nhập tên<p>", "inputName"), $(".page_dangkydichvu .tab").find("a").removeClass("active"), $("a[href*='tab_dangkydichvu_03']").addClass("active"), $(".page_dangkydichvu .content-tab").css("display", "none"), $("#tab_dangkydichvu_03").css("display", "block"), $("#inputName").focus(), !1) : "" == n || null == n ? (showErrorbyAlert("Đặt lịch hẹn dịch vụ", "<p>Vui lòng nhập số điện thoại!<p>", "inputPhone"), $(".page_dangkydichvu .tab").find("a").removeClass("active"), $("a[href*='tab_dangkydichvu_03']").addClass("active"), $(".page_dangkydichvu .content-tab").css("display", "none"), $("#tab_dangkydichvu_03").css("display", "block"), $("#inputPhone").focus(), !1) : validatePhone(n) ? "" !== i && null != i || (showErrorbyAlert("Đặt lịch hẹn dịch vụ", "<p>Vui lòng nhập biển số xe<p>", "inputLicenseCar"), $(".page_dangkydichvu .tab").find("a").removeClass("active"), $("a[href*='tab_dangkydichvu_03']").addClass("active"), $(".page_dangkydichvu .content-tab").css("display", "none"), $("#tab_dangkydichvu_03").css("display", "block"), $("#inputLicenseCar").focus(), !1) : (showErrorbyAlert("Đặt lịch hẹn dịch vụ", "<p>Vui lòng nhập đúng định dạng số điện thoại!<p>", "inputPhone"), $(".page_dangkydichvu .tab").find("a").removeClass("active"), $("a[href*='tab_dangkydichvu_03']").addClass("active"), $(".page_dangkydichvu .content-tab").css("display", "none"), $("#tab_dangkydichvu_03").css("display", "block"), $("#inputPhone").focus(), !1)
}

function CheckValueServiceRegister(n, t, i, r, u, f, e, o, s, h) {
    return "" == n || null == n || null == n ? (showErrorbyAlert("Đặt lịch hẹn dịch vụ", "<p>Vui lòng chọn 1 dịch vụ!<p>", ""), $(".page_dangkydichvu .tab").find("a").removeClass("active"), $(".selectService").find("a").addClass("active"), $(".page_dangkydichvu .content-tab").css("display", "none"), $("#tab_dangkydichvu_01").css("display", "block"), !1) : "" == t || "" == i ? (showErrorbyAlert("Đặt lịch hẹn dịch vụ", "<p>Vui lòng chọn ngày dự kiến!<p>", ""), $(".page_dangkydichvu .tab").find("a").removeClass("active"), $("a[href*='tab_dangkydichvu_02']").addClass("active"), $(".page_dangkydichvu .content-tab").css("display", "none"), $("#tab_dangkydichvu_02").css("display", "block"), $("#inputDate").focus(), !1) : 31 < parseInt(t) || parseInt(t) < 1 || 12 < parseInt(i) || 4 < r.length || parseInt(i) < 1 ? (showErrorbyAlert("Đặt lịch hẹn dịch vụ", "<p>Ngày dự kiến chưa đúng!<p>", ""), $(".page_dangkydichvu .tab").find("a").removeClass("active"), $("a[href*='tab_dangkydichvu_02']").addClass("active"), $(".page_dangkydichvu .content-tab").css("display", "none"), $("#tab_dangkydichvu_02").css("display", "block"), $("#inputDate").focus(), !1) : "0" == u || null == u ? (showErrorbyAlert("Đặt lịch hẹn dịch vụ", "<p>Vui lòng chọn thời gian dự kiến!<p>", ""), $(".page_dangkydichvu .tab").find("a").removeClass("active"), $("a[href*='tab_dangkydichvu_02']").addClass("active"), $(".page_dangkydichvu .content-tab").css("display", "none"), $("#tab_dangkydichvu_02").css("display", "block"), $("#timePicker").focus(), !1) : "" === f || null == f ? (showErrorbyAlert("Đặt lịch hẹn dịch vụ", "<p>Vui lòng chọn danh xưng<p>", ""), $(".page_dangkydichvu .tab").find("a").removeClass("active"), $("a[href*='tab_dangkydichvu_03']").addClass("active"), $(".page_dangkydichvu .content-tab").css("display", "none"), $("#tab_dangkydichvu_03").css("display", "block"), $("#ddlTitle").focus(), !1) : "" == e ? (showErrorbyAlert("Đặt lịch hẹn dịch vụ", "<p>Vui lòng nhập tên<p>", "inputName"), $(".page_dangkydichvu .tab").find("a").removeClass("active"), $("a[href*='tab_dangkydichvu_03']").addClass("active"), $(".page_dangkydichvu .content-tab").css("display", "none"), $("#tab_dangkydichvu_03").css("display", "block"), $("#inputName").focus(), !1) : "" == s || null == s ? (showErrorbyAlert("Đặt lịch hẹn dịch vụ", "<p>Vui lòng nhập số điện thoại!<p>", "inputPhone"), $(".page_dangkydichvu .tab").find("a").removeClass("active"), $("a[href*='tab_dangkydichvu_03']").addClass("active"), $(".page_dangkydichvu .content-tab").css("display", "none"), $("#tab_dangkydichvu_03").css("display", "block"), $("#inputPhone").focus(), !1) : validatePhone(s) ? "" !== h && null != h || (showErrorbyAlert("Đặt lịch hẹn dịch vụ", "<p>Vui lòng nhập biển số xe<p>", "inputLicenseCar"), $(".page_dangkydichvu .tab").find("a").removeClass("active"), $("a[href*='tab_dangkydichvu_03']").addClass("active"), $(".page_dangkydichvu .content-tab").css("display", "none"), $("#tab_dangkydichvu_03").css("display", "block"), $("#inputLicenseCar").focus(), !1) : (showErrorbyAlert("Đặt lịch hẹn dịch vụ", "<p>Vui lòng nhập đúng định dạng số điện thoại!<p>", "inputPhone"), $(".page_dangkydichvu .tab").find("a").removeClass("active"), $("a[href*='tab_dangkydichvu_03']").addClass("active"), $(".page_dangkydichvu .content-tab").css("display", "none"), $("#tab_dangkydichvu_03").css("display", "block"), $("#inputPhone").focus(), !1)
}

function postUserClickTools(n, t) {
    $.getJSON("http://jsonip.com/?callback=?", function(i) {
        var u = i.ip,
            f = $("#hdIdlr").val(),
            e = $("#hdApiUrl").val() + "/api/Tools/PostHistory?modelId=" + n + "&IpAddress=" + u + "&iDealer=" + f + "&type=" + t,
            r = toyotaDealerLog();
        $.ajax({
            type: "Post",
            url: e,
            headers: {
                Authorization: "X-XSRF-Token " + r,
                "X-XSRF-Token": r,
                "Content-Type": "application/json"
            },
            success: function(n) {
                for (var i = "", t = 0; t < n.length; t++) i += t < n.length - 1 ? n[t] + "," : n[t];
                $("#hdContent_Anylytics").val(i)
            }
        })
    })
}

function postMailEstimate(n, t) {
    var i = $(".checkCarTool:checked"),
        r = $("#hdIdlr").val(),
        u = $("#hddlistEstimate").val(),
        f = $("#hddlistAccessSelected").val(),
        e = $(".priceOfCarSelectedTool_Sum").html(),
        o = $(i).data("name"),
        s = $(i).data("price"),
        h = $(".colorOfCarSelectedTool").html(),
        c = $("#hdContent_Anylytics").val();
    angular.element($(".btnSendEmail")).scope().SentMailDuToanChiPhi(c, n, t, o, s, u, f, e, h, r);
    $(".btnSendEmail").parent().addClass("disabled-button");
    $("#hdContent_Anylytics").val("")
}

function postMailCompare(n, t) {
    var f = $("#hdContent_Anylytics").val(),
        e = $("#hdIdlr").val(),
        i = "",
        r, u;
    i += "<table cellpadding='10' cellspacing='0'>";
    i += "<tr>";
    i += "<td><\/td>";
    $(".nameValue").each(function() {
        var n = $(this).find("span.txt2"),
            t = $(n).find("span.name").text().trim(),
            r = $(n).find("span.price").text().trim();
        i += "<td><strong>" + t + "<\/strong><br/><p>" + r + "<\/p><\/td>"
    });
    i += "<\/tr>";
    i += "<tr>";
    i += "<td><\/td>";
    $(".priceValue").each(function() {
        i += "<td>" + $(this).text().trim() + "<\/td>"
    });
    i += "<\/tr>";
    r = 0;
    $(".tqrowlst").each(function() {
        i += r % 2 == 0 ? "<tr style='background-color:aliceblue'>" : "<tr>";
        i += "<td>" + $(this).text() + "<\/td>";
        $(".tqtablelst" + r).each(function() {
            i += $(this).html()
        });
        r++;
        i += "<\/tr>"
    });
    i += "<\/table>";
    u = "";
    $(".ckCompareCarChecked[data-carid]").each(function() {
        u += $(this).data().carid + ","
    });
    angular.element($(".btnSendEmail")).scope().SentMailSoSanhXeMoi(u, f, n, t, i, e);
    $(".btnSendEmail").parent().addClass("disabled-button");
    $("#hdContent_Anylytics").val("")
}

function postMailSupportFinance(n, t) {
    var i = $("#hdContent_Anylytics").val(),
        r = $("#hdIdlr").val(),
        u = $(".spResultTitle").html(),
        f = $(".spResultPrice").html(),
        e = $(".spResultAccesoryPrice").html(),
        o = $(".spResultFirstPrice").html(),
        s = $("#ddlSupporProduct").val(),
        h = $(".spPriceTotal").html(),
        c = $("#spOwnPrice").html(),
        l = $(".spPriceTotal5050").html(),
        a = $(".colorOfCarSelectedTool").html();
    angular.element($(".btnSendEmail")).scope().SentMailHoTroTaiChinh(i, n, t, u, f, e, o, h, c, s, l, a, r);
    $(".btnSendEmail").parent().addClass("disabled-button");
    $("#hdContent_Anylytics").val("")
}

function postMailCompareOld(n, t) {
    var f = $("#hdContent_Anylytics").val(),
        u, i, r;
    "" != t ? ($("#hdApiUrl").val(), u = $("#hdIdlr").val(), i = "", i += "<table cellpadding='10' cellspacing='0'>", i += "<tr>", i += "<td><\/td>", $(".nameValue").each(function() {
        var n = $(this).find("span.txt2"),
            t = $(n).find("span.name").text().trim(),
            r = $(n).find("span.price").text().trim();
        i += "<td><strong>" + t + "<\/strong><br/><p>" + r + "<\/p><\/td>"
    }), i += "<\/tr>", i += "<tr>", i += "<td><\/td>", $(".priceValue").each(function() {
        i += "<td>" + $(this).text().trim() + "<\/td>"
    }), i += "<\/tr>", r = 0, $(".tqrowlst").each(function() {
        i += r % 2 == 0 ? "<tr style='background-color:aliceblue'>" : "<tr>";
        i += "<td>" + $(this).text() + "<\/td>";
        $(".tqtablelst" + r).each(function() {
            i += $(this).html()
        });
        r++;
        i += "<\/tr>"
    }), i += "<\/table>", angular.element($(".btnSendEmail")).scope().SentMailSoSanhXeCu(f, n, t, i, u), $(".btnSendEmail").parent().addClass("disabled-button"), $("#hdContent_Anylytics").val("")) : showErrorbyAlert("So sánh xe đã qua sử dụng", "<p>Vui lòng nhập email!<p>", "")
}

function ChangeListNewProduct() {
    var n = "" === $("#hdCurrentPage").val() ? 1 : $("#hdCurrentPage").val(),
        a = $("#selectsort").find(":selected").data("id"),
        t = $("#selectsort").val(),
        c, l;
    t = null == t ? $("#selectsort").find(":selected").val() : t;
    var r = $("#hdSeoUrl").val(),
        v = $("#hdIdlr").val(),
        y = $("#hdApiUrl").val(),
        u = GetDataNew("ckCat"),
        f = GetDataNew("ckPrice"),
        p = GetDataNew("ckSeat"),
        e = GetDataNew("ckStyle"),
        o = GetDataNew("ckFuel"),
        s = GetDataNew("ckMadeIn"),
        w = "?sPage=" + n + "&_SeoUrl=" + r + "&idDlr=" + v + "&sPrice=" + f + "&sCat=" + u + "&sStyle=" + e + "&sFuel=" + o + "&iSort=" + a + "&sSeat=" + p + "&sOrigin=" + s,
        i = 0,
        h = toyotaDealerLog();
    $.ajax({
        type: "Get",
        url: y + "/api/Detail/GetListNewsCar" + w,
        headers: {
            Authorization: "X-XSRF-Token " + h,
            "X-XSRF-Token": h,
            "Content-Type": "application/json"
        },
        success: function(t) {
            var u = "",
                h = t.lModels.length,
                r, s, e, f;
            if (i = t.pageCount, $("#ulProduct").fadeOut(200, function() {
                    $("#ulProduct").empty();
                    $("#PaggingSection").empty()
                }), 0 < h) {
                for (r = 0; r < h; r++) {
                    var c = $("#hdMoneyUnit").val(),
                        l = $("#hdEstimateLink").val(),
                        a = $("#hdCompareLink").val(),
                        v = t.lModels[r].newS_PRICE1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
                        o = "";
                    for (o = 0 == t.lModels[r].newS_PRICE1 ? "<strong>Sẽ cập nhật sau<\/strong>" : "<strong>" + v + "<\/strong> <sup>" + c + "<\/sup>", s = "Giá từ:", u += '<li class="item"><div class="inner"><div class="inner_ct"><a href="' + ("" === t.lModels[r].newS_URL ? t.lModels[r].newS_SEO_URL : t.lModels[r].newS_URL) + '"><div class="link-top"><span>' + s + " " + o + "<\/span><\/div><div class=\"img\"><img class='lazy' src='/Content/images/notfound/notfound-images.png?w=250&h=145&mode=crop' data-original='/data/news/" + t.lModels[r].id + "/" + t.lModels[r].newS_IMAGE3 + '?w=250&h=145&mode=crop\'/><\/div><div class="txt"><div class="txt1"><span><p class="small">2017<\/p><p class="name">' + t.lModels[r].newS_TITLE + '<\/p><\/span><\/div><div class="txt2"><p class="price"><span class="t1">' + s + "<\/span> " + o + '<\/p><p class="desc">', e = 0; e < t.lModels[r].lDeclare.length; e++) u += "<span>&#8226; " + t.lModels[r].lDeclare[e].decL_NAME + "<\/span>";
                    u += "<span> &#8226; " + t.lModels[r].newS_DESC.replace(/\r\n/g, "<\/span><span> &#8226; ") + "<\/span>";
                    u += '<\/p><\/div><\/div><\/a><\/div><p class="link"><a href="/' + l + "?car=" + ("" === t.lModels[r].newS_URL ? t.lModels[r].newS_SEO_URL : t.lModels[r].newS_URL) + '">Dự toán<\/a> | <a href="/' + a + "?car=" + ("" === t.lModels[r].newS_URL ? t.lModels[r].newS_SEO_URL : t.lModels[r].newS_URL) + '">So sánh<\/a><\/p><\/div><\/li>'
                }
                f = "";
                $("#ulProduct").fadeIn(200, function() {
                    var r = parseInt(n) - 1,
                        e = parseInt(n) + 1,
                        t;
                    for (f += '<li class="ckDeclareNewPage prev" data-page="' + r + '" ' + (1 == n ? 'style="display:none"' : "") + '><span><i class="fa fa-angle-left"><\/i><\/span><\/li>', t = 1; t <= i; t++) f += t == n ? "<li data-page=" + t + " class='active ckDeclareNewPage'><span>" + t + "<\/span><\/li>" : "<li data-page=" + t + " class='ckDeclareNewPage'><span>" + t + "<\/span><\/li>";
                    1 < i && (f += '<li class="next ckDeclareNewPage" data-page="' + e + '" ' + (n == i ? 'style="display:none"' : "") + '><span><i class="fa fa-angle-right"><\/i><\/span><\/li>', $(f).appendTo("#PaggingSection"));
                    $(u).appendTo("#ulProduct");
                    $(this).parent().find("li.pagging").removeClass("active");
                    $(this).parent().find("li[class^='pagging'][data-page^='" + n + "']:not(.prev):not(.next)").addClass("active");
                    $(this).parent().attr("data-currentpage", n);
                    $("img.lazy").lazyload({
                        effect: "fadeIn",
                        threshold: 200
                    });
                    $(".ckDeclareNewPage").on("click", function() {
                        $(".ckDeclareNewPage").removeClass("active");
                        $(this).addClass("active");
                        var n = $(this).data("page");
                        $("#hdCurrentPage").val(n);
                        ChangeListNewProduct()
                    })
                })
            }
        }
    });
    c = r + "?page=" + n + "&price=" + f + "&model=" + u + "&style=" + e + "&fuel=" + o + "&sort=" + t + "&madein=" + s;
    l = document.getElementsByTagName("title")[0].innerHTML;
    changeUrlWithOutRefreshPage(c, l)
}

function addToCompare_JS(n, t, i, r, u) {
    angular.element($("#ulProduct")).scope().addCompare(n, t, i, r, u)
}

function removeCompare_JS(n) {
    angular.element($("#ulProduct")).scope().removeCompare(n)
}

function removeAllCompare_JS() {
    angular.element($("#ulProduct")).scope().removeAllCompare()
}

function processToCompare_JS() {
    angular.element($("#ulProduct")).scope().processingToCompare()
}

function expandAll() {
    $(".collapsible-header").addClass("active");
    $(".collapsible").collapsible({
        accordion: !1
    })
}

function collapseAll() {
    $(".collapsible-header").removeClass(function() {
        return "active"
    })
}

function changeListResult() {
    var n = "" === $("#hdCurrentPage").val() ? 1 : $("#hdCurrentPage").val(),
        t = $("#ddlSort").val(),
        i = $("#hdSeoUrl").val(),
        r = $("#hdIdlr").val(),
        a = $("#hdApiUrl").val(),
        u = getData("ckPrice"),
        f = getData("ckYear"),
        e = getData("ckModel"),
        o = getData("ckStyle"),
        s = getData("ckFuel"),
        h = getData("ckMile"),
        c = getData("ckBranch"),
        v = a + "/api/Detail/GetListProductOld?sPage=" + n + "&_SeoUrl=" + i + "&idDlr=" + r + "&sPrice=" + u + "&sYear=" + f + "&sModelsCar=" + e + "&sStyle=" + o + "&sFuel=" + s + "&sMileage=" + h + "&iSort=" + t + "&branchId=" + c,
        y = i + "/?page=" + n + "&price=" + u + "&id=" + r + "&year=" + f + "&models=" + e + "&style=" + o + "&fuel=" + s + "&mileage=" + h + "&sort=" + t + "&branchId=" + c,
        l = toyotaDealerLog();
    $.ajax({
        type: "Get",
        url: v,
        headers: {
            Authorization: "X-XSRF-Token " + l,
            "X-XSRF-Token": l,
            "Content-Type": "application/json"
        },
        success: function(t) {
            var u = "",
                f = t.lModels.length,
                e = t.pageCount,
                c = $("#hdCompareOld").val(),
                i, h;
            if ($("#countOfOldCar").text(f), $("#ulProductOld").empty(), $("#PaggingSection").empty(), f > 0) {
                for (i = 0; f > i; i++) {
                    for (var l = subStringSmarter(t.lModels[i].newS_TITLE, 40, " "), a = t.lModels[i].newS_PRICE1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."), v = $("#hdMoneyUnit").val(), o = "", s = 2016, r = 0; r < t.lModels[i].lDeclare.length; r++) o += "<span> &#8226; " + t.lModels[i].lDeclare[r].decL_NAME + "<\/span>", 6 == t.lModels[i].lDeclare[r].id && (s = t.lModels[i].lDeclare[r].decL_NAME);
                    u += '<li class="item"><div class="inner"><div class="inner_ct"><a href="' + ("" === t.lModels[i].newS_URL ? t.lModels[i].newS_SEO_URL : t.lModels[i].newS_URL) + '" title="' + t.lModels[i].newS_TITLE + '"><div class="img ' + (0 == t.lModels[i].newS_STATUS_ITEM ? "soldout" : "") + '"><img class="lazy" src="/Content/images/notfound/notfound-images.png?w=195&h=145&mode=crop" data-original="/data/news/' + t.lModels[i].id + "/" + t.lModels[i].newS_IMAGE3 + '?w=195&h=145&mode=crop"><\/div><div class="txt"><div class="txt1"><span><p class="small_old">' + s + '<\/p><p class="name">' + l + '<\/p><\/span><\/div><div class="txt2"><p class="price"><span>Giá ';
                    u += t.lModels[i].newS_PRICE1 > 0 ? "<strong>" + a + " <\/strong><sup>" + v + "<\/sup>" : "<strong>: Liên hệ<\/strong>";
                    u += '<\/span><\/p><p class="desc"><span> &#8226; ' + t.lModels[i].sUNIT_ID5 + " km<\/span>" + o + '<\/a><\/p><\/div><\/div><\/div><p class="link"><a href="/' + c + "?car=" + ("" === t.lModels[i].newS_URL ? t.lModels[i].newS_SEO_URL : t.lModels[i].newS_URL) + '">so sánh<\/a>  | <a class="various btnContactFormOld" data-name="' + t.lModels[i].newS_TITLE + '" data-id="' + t.lModels[i].id + '" href="#lien-he-xe-da-qua-su-dung">liên hệ<\/a><\/p><\/div><\/li>'
                }
                $("#ulProductOld").fadeIn(200, function() {
                    var t;
                    if ($(u).appendTo("#ulProductOld"), e > 1) {
                        var r = parseInt(n) - 1,
                            f = parseInt(n) + 1,
                            i = "";
                        for (i += '<li class="ckDeclarePage prev" data-page="' + r + '" ' + (1 == n ? 'style="display:none"' : "") + '><span><i class="fa fa-angle-left"><\/i><\/span><\/li>', t = 1; e >= t; t++) i += t == n ? "<li data-page=" + t + " class='active ckDeclarePage'><span>" + t + "<\/span><\/li>" : "<li data-page=" + t + " class='ckDeclarePage'><span>" + t + "<\/span><\/li>";
                        i += '<li class="next ckDeclarePage" data-page="' + f + '" ' + (n == e ? 'style="display:none"' : "") + '><span><i class="fa fa-angle-right"><\/i><\/span><\/li>';
                        $(i).appendTo("#PaggingSection")
                    }
                    $("img.lazy").lazyload({
                        effect: "fadeIn",
                        threshold: 200
                    });
                    $(".ckDeclarePage").on("click", function() {
                        $(".ckDeclarePage").removeClass("active");
                        $(this).addClass("active");
                        var n = $(this).data("page");
                        $("#hdCurrentPage").val(n);
                        changeListResult()
                    })
                })
            }
            $("img.lazy").lazyload({
                effect: "fadeIn",
                threshold: 200
            });
            $(".various").fancybox({});
            $(".various").on("click", function() {
                $("#hdIdOld").val($(this).data("id"));
                $("#hdTitleOld").val($(this).data("name"));
                setTimeout(function() {
                    $("#txtNameOld").focus()
                }, 1e3)
            });
            h = document.getElementsByTagName("title")[0].innerHTML;
            changeUrlWithOutRefreshPage(y, h)
        }
    })
}

function getData(n) {
    var t = "",
        i = 1;
    return $("." + n + ":checkbox:checked").each(function() {
        t += 1 === i ? $(this).val() : "," + $(this).val();
        i++
    }), t
}

function openGallery(n) {
    $("#imgContentLibrary").empty();
    var t = "<div class='owl-carousel slide-dt2'>";
    $("." + n).each(function() {
        t += "<div class='item'><img src='";
        var n = $(this).val();
        t += n + "'/><\/div>"
    });
    t += "<\/div>";
    $(t).appendTo("#imgContentLibrary");
    $(".slide-dt2").owlCarousel({
        items: 1,
        loop: !0,
        margin: 0,
        URLhashListener: !0,
        autoplayHoverPause: !0,
        dots: !1,
        nav: !0
    })
}

function paggingAll() {}

function tab_slide(n) {
    switch (n) {
        case 1:
            $(".van_hanh .tabs .tab a").on("click", function() {
                var n = $($(this).attr("href"));
                n.onAvailable(function() {
                    var t = n.find(".slide-features");
                    void 0 === t.data("owlCarousel") && t.owlCarousel(owlOptionsOperate)
                })
            });
            $(".van_hanh .tabs .tab a:eq(0)").trigger("click");
            break;
        case 2:
            $(".phu_kien .tabs .tab a").on("click", function() {
                var n = $($(this).attr("href"));
                n.onAvailable(function() {
                    var t = n.find(".slide-features");
                    void 0 === t.data("owlCarousel") && t.owlCarousel(owlOptionsOperate)
                })
            });
            $(".van_hanh .tabs .tab a:eq(0)").trigger("click")
    }
}

function OpenPopUp() {
    $(".open_popup_pc").on("click", function() {
        var t = $(this).data("href"),
            i = $(this).data("index"),
            n;
        $.fancybox.open([{
            src: t
        }]);
        n = $($(this).data("href")).find(".owl-carousel");
        $(n).owlCarousel(owlOptionsPopUp);
        n.trigger("to.owl.carousel", i);
        n.on("changed.owl.carousel", function(n) {
            var i, t;
            $(".owl-item").each(function() {
                var t = $(this).find("iframe"),
                    n;
                t.length > 0 && void 0 != (n = t[0].contentWindow) && n.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
                (n = $(this).find("video")).length > 0 && n.get(0).pause()
            });
            i = $(n.target).find(".owl-item").eq(n.item.index).find("iframe");
            i.length > 0 && void 0 != (t = i[0].contentWindow) && t.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
            (t = $(n.target).find(".owl-item").eq(n.item.index).find("video")).length > 0 && t.get(0).play()
        });
        setTimeout(function() {
            var i = $(n).find(".owl-item.active").find("iframe"),
                t;
            i.length > 0 && void 0 != (t = i[0].contentWindow) && t.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
            (t = $(n).find(".owl-item.active").find("video")).length > 0 && t.get(0).play()
        }, 1e3)
    })
}

function OpenPopUpPK() {
    $(".open_popup_pc_pk").on("click", function() {
        var t = $(this).data("href"),
            i = $(this).data("index"),
            n;
        $.fancybox.open([{
            src: t
        }]);
        n = $($(this).data("href")).find(".owl-carousel");
        $(n).owlCarousel(owlOptionsPopUp);
        n.trigger("to.owl.carousel", i);
        n.on("changed.owl.carousel", function(n) {
            var i, t;
            $(".owl-item").each(function() {
                var t = $(this).find("iframe"),
                    n;
                t.length > 0 && void 0 != (n = t[0].contentWindow) && n.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
                (n = $(this).find("video")).length > 0 && n.get(0).pause()
            });
            i = $(n.target).find(".owl-item").eq(n.item.index).find("iframe");
            i.length > 0 && void 0 != (t = i[0].contentWindow) && t.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
            (t = $(n.target).find(".owl-item").eq(n.item.index).find("video")).length > 0 && t.get(0).play()
        });
        setTimeout(function() {
            var i = $(n).find(".owl-item.active").find("iframe"),
                t;
            i.length > 0 && void 0 != (t = i[0].contentWindow) && t.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
            (t = $(n).find(".owl-item.active").find("video")).length > 0 && t.get(0).play()
        }, 1e3)
    })
}

function openGalerry(n) {
    $("#popupGalleryWaiting").fadeIn();
    $("#popupGalleryContent").fadeIn();
    var t = $(n).closest(".item").find(".contentPopUp");
    $("#popupGalleryContent").html("");
    $("#popupGalleryContent").html($(t).html());
    $("#popupGalleryContent div.slide-dt2").addClass("slideInPopUp2");
    $("#popupGalleryContent div.slide-dt-thumb2").addClass("slideInPopUpThumb2");
    $(".slideInPopUp2").owlCarousel({
        items: 1,
        loop: !1,
        margin: 0,
        URLhashListener: !0,
        autoplayHoverPause: !0,
        startPosition: "URLHash",
        dots: !1,
        onTranslated: function() {
            var n = $(".owl-item.active img", this.$element).width(),
                t = $(".owl-item.active", this.$element).width();
            n > t / 100 * 99 ? $(".owl-item.active .txt-slide", this.$element).addClass("txt-left") : $(".owl-item.active .txt-slide", this.$element).width(t - n)
        }
    });
    $(".slideInPopUpThumb2").owlCarousel({
        items: 5,
        loop: !1,
        dots: !1,
        center: !1,
        nav: !1
    });
    $(".modal-gallery").addClass("active");
    $("#popupGalleryWaiting").fadeOut(500);
    $("#popupGalleryContent").fadeIn(500)
}

function loadAccessory() {
    var t = $("#hdCatId").val(),
        i = $("#hdApiUrl").val(),
        r = "/api/Detail/GetAccessoriesNewCar?CatId=" + t + "&idDlr=" + $("#hdIdlr").val(),
        n;
    $("#ulAccessoriesProduct").empty();
    $("#tabsContentAccessoriesProduct").empty();
    n = toyotaDealerLog();
    $.ajax({
        type: "Get",
        url: i + r,
        headers: {
            Authorization: "X-XSRF-Token " + n,
            "X-XSRF-Token": n,
            "Content-Type": "application/json"
        },
        success: function(n) {
            var i, r, o;
            if (n.length > 0) {
                for (var f = "", e = "", s = "", h = $("#hdMoneyUnit").val(), c = CheckIfIsMobileNotIpad(), t = 0; t < n.length; t++) {
                    for (s += '<li class="tab"><a class="tab_accessories" href="#tab_accessories_service_0' + (t + 1) + '">' + n[t].name + "<\/a><\/li>", f += '<div id="tab_accessories_service_0' + (t + 1) + '" class="content-tab"><div class="inner"><div class="products all_van_hanh"><ul class="owl-carousel slide-features">', e += '<div class="slide_pc_on_popup_operate popup_item" id="popup_pc_accessory_0' + t + '" style="display: none;"><div class="title_p">Phụ kiện chính hãng<\/div><div class="owl-carousel slide_pc_on_popup">', i = 0; i < n[t].lAcces.length; i++) {
                        var l = formatMoney(n[t].lAcces[i].aS_PRICE + ".000"),
                            a = subStringSmarter(n[t].lAcces[i].aS_TITLE, 50, " "),
                            u = n[t].lAcces[i].aS_DESC;
                        u = null != u && "" != u ? "<div class='txt_p_3'><p><b>Mô tả<\/b><\/p><p>" + u + "<\/p><\/div>" : "";
                        r = n[t].lAcces[i].aS_BENEFIT;
                        r = null != r && "" != r ? "<div class='txt_p_3'><p><b>Lợi ích<\/b><\/p><p>" + r + "<\/p><\/div>" : "";
                        f += '<li class="item"><a ' + (c ? 'class="link_pmb" data-link="pmb_phukien"' : 'class="open_popup_pc_pk" data-href="#popup_pc_accessory_0' + t + '" data-index="' + i + '"') + '><div class="inner"><div class="img"><img class="owl-lazy" src="/Content/images/notfound/notfound-images.png" data-src="/data/accessories/' + n[t].lAcces[i].id + "/" + n[t].lAcces[i].aS_IMG + '?w=257&h=127&mode=crop" alt="' + n[t].lAcces[i].aS_TITLE + '"/><\/div><div class="txt"><div class="txt1"><p class="name" title="' + n[t].lAcces[i].aS_TITLE + '">' + a + '<\/p><\/div><div class="txt2"><p class="desc">Giá: <strong>' + l + "<\/strong> <sup>" + h + "<\/sup><\/p><\/div><\/div><\/div><\/a><\/li>";
                        c || (e += '<div class="item"><div class="inner_item"><p class="img"><img src="/data/accessories/' + n[t].lAcces[i].id + "/" + n[t].lAcces[i].aS_IMG + '" alt="' + n[t].lAcces[i].aS_TITLE + '"><\/p><div class="txt_p"><div class="txt_p_1">' + n[t].lAcces[i].aS_TITLE + '<\/div><div class="txt_p_2">Giá: <strong>' + l + " <sup>" + h + "<\/sup><\/strong><br /><\/div>" + u + r + '<div class="txt_index">' + (i + 1) + " / " + n[t].lAcces.length + "<\/div><\/div><\/div><\/div>");
                        0
                    }
                    f += "<\/ul><\/div><\/div><\/div>";
                    e += "<\/div><\/div>"
                }
                $("#ulAccessoriesProduct").html(s);
                $("#tabsContentAccessoriesProduct").html(f);
                $("#listPopupAccessory").html(e);
                $(".slide-features").owlCarousel(owlOptionsOperate);
                $("ul.tabs_phu_kien").tabs();
                $("img.lazy").lazyload({
                    effect: "fadeIn",
                    threshold: 200
                });
                $(".tab_accessories").on("click", function() {
                    var n = $($(this).attr("href"));
                    $(n).find("img").each(function() {
                        $(this).attr("src") != $(this).data("src") && ($(this).attr("src", $(this).data("src")), $(this).css("opacity", "1"), $(this).removeClass("owl-lazy"))
                    })
                });
                o = 1;
                $(".tabs_phu_kien li").find("a").each(function() {
                    if (1 == o) {
                        var n = $($(this).attr("href"));
                        $(n).find("img").each(function() {
                            $(this).attr("src") != $(this).data("src") && ($(this).attr("src", $(this).data("src")), $(this).css("opacity", "1"), $(this).removeClass("owl-lazy"))
                        })
                    }
                    o += 1
                });
                OpenPopUpPK()
            } else $("#sec_dt_09").remove(), $("a[href='#sec_dt_09']").parent().remove()
        }
    })
}

function showOrhideTestDriveButton() {
    var t = $("#hdCatId").val(),
        i = $("#hdIdlr").val(),
        r = $("#hdApiUrl").val(),
        n = toyotaDealerLog();
    $.ajax({
        type: "Get",
        url: r + "/api/Tools/LoadListCatsCompare?idDlr=" + i,
        headers: {
            Authorization: "X-XSRF-Token " + n,
            "X-XSRF-Token": n,
            "Content-Type": "application/json"
        },
        success: function(n) {
            for (var r = 0, i = 0; i < n.length; i++) t == n[i].id && (r += 1);
            0 == r && ($("#btnTestDrive").addClass("hide"), $("#btnCompare").removeClass("bg-light-grey"))
        }
    })
}

function loadSpecImage() {
    var t = $("#hdCatId").val(),
        n = toyotaDealerLog(),
        i = $("#hdApiUrl").val();
    $(".content-spec").each(function() {
        var r = $(this).data("catspec"),
            u = $(this).find(".inner");
        $.ajax({
            type: "Get",
            url: i + "/api/Detail/GetSpecImage?CatId=" + t + "&SpecGroupId=" + r,
            headers: {
                Authorization: "X-XSRF-Token " + n,
                "X-XSRF-Token": n,
                "Content-Type": "application/json"
            },
            success: function(n) {
                if (console.log(n), "" != n) {
                    var t = "<div class='col s12' style='text-align: center'><img style='max-width: 100%' src='" + n + "'/><\/div>";
                    $(u).append(t)
                }
            }
        })
    })
}
$(document).ready(function() {
    setUpFormValidate();
    var n = getCookie("slmsrcd1");
    $("#hdCatpcha").val(n);
    $("form label").each(function() {
        $(this).attr("data-holderOriginal", $(this).text())
    })
});
jQuery.validator.addMethod("phoneVN", function(n, t) {
    return n = n.replace(/\+84+/g, "").replace(/\_+/g, "").replace(/\(+/g, "").replace(/\)+/g, "").replace(/\s+/g, ""), this.optional(t) || n.match(/^[\d]{8,12}$/)
}, "Số điện thoại chưa đúng");
jQuery.validator.addMethod("email", function(n, t) {
    return n = n.replace(/\s+/g, ""), this.optional(t) || n.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z\-]{3,9})+\.)+([a-zA-Z]{2,4})+$/)
}, "Email chưa đúng");
jQuery.extend(jQuery.validator.messages, {
    required: "Vui lòng nhập",
    remote: "Hãy sửa cho đúng.",
    url: "Hãy nhập URL.",
    date: "Hãy nhập ngày.",
    dateISO: "Hãy nhập ngày (ISO).",
    number: "Hãy nhập số.",
    digits: "Hãy nhập chữ số.",
    creditcard: "Hãy nhập số thẻ tín dụng.",
    equalTo: "Hãy nhập thêm lần nữa.",
    extension: "Phần mở rộng không đúng.",
    maxlength: $.validator.format("Hãy nhập từ {0} kí tự trở xuống."),
    minlength: $.validator.format("Hãy nhập từ {0} kí tự trở lên."),
    rangelength: $.validator.format("Hãy nhập từ {0} đến {1} kí tự."),
    range: $.validator.format("Hãy nhập từ {0} đến {1}."),
    max: $.validator.format("Hãy nhập từ {0} trở xuống."),
    min: $.validator.format("Hãy nhập từ {1} trở lên.")
});
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
};
$(document).ready(function() {
    $("#fix-compare-bottom .btnslidedown").on("click", function() {
        $(this).hasClass("active") ? ($("#fix-compare-bottom").removeClass("cls_min"), $(this).removeClass("active").children().text("Thu nhỏ")) : ($("#fix-compare-bottom").addClass("cls_min"), $(this).addClass("active").children().text("Mở rộng"))
    });
    $(".open-compare-bottom").on("click", function() {
        $("#fix-compare-bottom").addClass("active").removeAttr("style")
    });
    $("#selectsort").on("change", function() {
        $("#hdCurrentPage").val(1);
        ChangeListNewProduct()
    });
    $(".ckDeclareNew").on("click", function() {
        $("#hdCurrentPage").val(1);
        0 == checkListInMobileChange() && ChangeListNewProduct()
    });
    $(".ckPrice").on("click", function() {
        $(".ckPrice:checked").not(this).prop("checked", "");
        $("#hdCurrentPage").val(1);
        0 == checkListInMobileChange() && ChangeListNewProduct()
    });
    $(".ckDeclareNewPage").on("click", function() {
        $(".ckDeclareNewPage").removeClass("active");
        $(this).addClass("active");
        var n = $(this).data("page");
        $("#hdCurrentPage").val(n);
        ChangeListNewProduct()
    });
    $(".btn-filter-new-products").on("click", function() {
        ChangeListNewProduct()
    })
});
$(document).ready(function() {
    $(".page_pre_owned_detail").length > 0 && $(".old-car-slide").on("click", function() {
        $("#big_img_mobile_detail_old").attr("src", $(this).data("img"));
        $("#open_mobile_popup_detail_old").data("index", $(this).data("index"))
    });
    $(".pre-products li").addClass("heightLine").css("min-height", 244);
    $(".ckDeclare").on("change", function() {
        $("#hdCurrentPage").val(1);
        0 == checkListInMobileChange() && changeListResult()
    });
    $(".ckPrice").on("click", function() {
        $("#hdCurrentPage").val(1);
        $(".ckPrice:checked").not(this).prop("checked", "");
        0 == checkListInMobileChange() && changeListResult()
    });
    $("#ddlSort").on("change", function() {
        $("#hdCurrentPage").val(1);
        changeListResult()
    });
    $(".ckDeclarePage").on("click", function() {
        $(".ckDeclarePage").removeClass("active");
        $(this).addClass("active");
        var n = $(this).data("page");
        $("#hdCurrentPage").val(n);
        changeListResult()
    });
    $(".btn-filter-new-productsold").on("click", function() {
        $("#hdCurrentPage").val(1);
        changeListResult()
    });
    $(".collapsible").collapsible({
        accordion: !1
    });
    $(".slide-dt").owlCarousel({
        items: 1,
        loop: !1,
        center: !1,
        margin: 0,
        URLhashListener: !0,
        autoplayHoverPause: !0,
        startPosition: "URLHash",
        dots: !1
    });
    $(".slide-dt-thumb").owlCarousel({
        items: 4,
        loop: !1,
        dots: !1,
        center: !1,
        margin: 10,
        nav: !0,
        mouseDrag: !1
    });
    $(".various").fancybox({});
    $(".btnContactFormOld").on("click", function() {
        $("#hdIdOld").val($(this).data("id"));
        $("#hdTitleOld").val($(this).data("name"));
        setTimeout(function() {
            $("#txtNameOld").focus()
        }, 1e3);
        var n = getSessionBranchId();
        null != n && void 0 != n && n > 0 ? ($("#checkBranch" + n + "_Old").prop("checked", !0), $("#hdIsDealerSendMessage").val(n)) : ($("#checkDealerMain_Old").prop("checked", !0), $("#hdIsDealerSendMessage").val("true"))
    })
});
$(document).ready(function() {
    $(".content_page p").css("background", "none");
    $(".content_page div").css("background", "none");
    $("li.pagging").on("click", function(n) {
        n.stopImmediatePropagation();
        var i = $(this).parent().data("currentcat"),
            e = $(this).parent().data("totalpage"),
            r = $(this).parent().data("notfound"),
            o = $(this).parent().data("viewmore"),
            t = parseInt($(this).data("page")),
            s = $("#hdApiUrl").val(),
            h = $("#hdIdlr").val(),
            c = $("#hdDeAName").val(),
            u = $(this).parent().parent().parent().find("ul.newsContent"),
            f = toyotaDealerLog();
        console.log(t);
        $.ajax({
            type: "GET",
            url: s + "/api/Detail/GetListNewsChilds?iCatId=" + i + "&iPageCurr=" + t + "&idDlr=" + h,
            headers: {
                Authorization: "X-XSRF-Token " + f,
                "X-XSRF-Token": f,
                "Content-Type": "application/json"
            },
            success: function(n) {
                var s = "",
                    t, y;
                if (n.length > 0)
                    for (t = 0; t < n.length; t++) {
                        var h = subStringSmarter(n[t].newS_TITLE, 55, " "),
                            p = subStringSmarter(n[t].newS_DESC, 110, " "),
                            l = "" !== n[t].newS_URL ? n[t].newS_URL : n[t].newS_SEO_URL,
                            w = "/data/news/" + n[t].id + "/" + n[t].newS_IMAGE3 + "?w=278&h=168&mode=crop",
                            f = new Date(n[t].newS_PUBLISHDATE),
                            a = n[t].newS_TARGET,
                            e = f.getDate(),
                            o = f.getMonth() + 1,
                            v = (f.getFullYear(), r);
                        i != n[t].caT_ID && (v = "" == n[t].caT_IMAGE ? r : "/data/categories/" + n[t].caT_ID + "/" + n[t].caT_IMAGE);
                        10 > e && (e = "0" + e);
                        10 > o && (o = "0" + o);
                        y = 1 === n[t].partof ? "Toyota Việt Nam" : c;
                        s += '<li class="item col s3"><div class="inner"><p class="img"><a href="' + l + '" target="' + a + '"><img class="lazy" src="' + v + '?w=278&h=168&mode=crop" data-original="' + w + '" alt="' + h + '"><\/a><\/p><div class="txt"><h3 class="title"><a href="' + l + '" title="' + n[t].newS_TITLE + '" alt="' + n[t].newS_TITLE + '" target="' + a + '">' + h + '<\/a><\/h3><span class="cate_of">' + y + '<\/span><div class="desc">' + p + "<\/div><\/div><\/div><\/li>"
                    }
                $(u).empty();
                $(s).appendTo(u);
                $("img.lazy").lazyload({
                    effect: "fadeIn",
                    threshold: 200
                });
                $("body, html").animate({
                    scrollTop: $("#content").offset().top
                }, 500)
            }
        });
        t > 1 ? ($(this).parent().find("li.prev").data("page", t - 1), $(this).parent().find("li.prev").css("opacity", "1"), t === e ? $(this).parent().find("li.next").css("opacity", "0") : $(this).parent().find("li.next").css("opacity", "1"), $(this).parent().find("li.next").data("page", t + 1)) : ($(this).parent().find("li.prev").css("opacity", "0"), $(this).parent().find("li.prev").data("page", 1), $(this).parent().find("li.next").data("page", 2), $(this).parent().find("li.next").css("opacity", "1"));
        $(this).parent().find("li.pagging").removeClass("active");
        $(this).parent().find("li[class='pagging'][data-page='" + t + "']:not(.prev):not(.next)").addClass("active");
        $(this).parent().attr("data-currentpage", t);
        var l = $("#hdListNews").val(),
            a = l + "?type=" + o + "&page=" + t,
            v = document.getElementsByTagName("title")[0].innerHTML;
        changeUrlWithOutRefreshPage(a, v)
    })
});
var _w_win = $(window).width(),
    owlOptionsOperate = {
        loop: !1,
        items: 1,
        autoplay: !1,
        margin: 20,
        center: !1,
        nav: !0,
        dots: !1,
        lazyLoad: !0,
        animateOut: "fadeOut",
        responsive: {
            0: {
                items: 1,
                margin: 10,
                nav: !1
            },
            568: {
                items: 2,
                nav: !0
            },
            768: {
                items: 3,
                nav: !0
            },
            1026: {
                items: 4
            }
        }
    },
    owlOptionsEx = {
        loop: !1,
        items: 1,
        autoplay: !1,
        margin: 4,
        center: !1,
        nav: !0,
        dots: !1,
        lazyLoad: !0,
        animateOut: "fadeOut",
        responsive: {
            0: {
                items: 1,
                margin: 10,
                nav: !1
            },
            568: {
                items: 2,
                nav: !0
            },
            768: {
                items: 3,
                nav: !0
            },
            1026: {
                items: 4
            }
        }
    },
    owlOptionsPopUp = {
        loop: !0,
        items: 1,
        margin: 6,
        nav: !0,
        dots: !0,
        lazyLoad: !0
    };
$(document).ready(function() {
    var n = getParameterByName("spy"),
        t;
    void 0 != n && "" != n && setTimeout(function() {
        $("html,body").animate({
            scrollTop: $("#" + n).offset().top - 70
        }, 500)
    }, 500);
    t = CheckIfIsMobileNotIpad();
    ($(".various").fancybox({}), $(".list-color ul li").on("click", function() {
        var n, t, i;
        $(".list-color ul li").removeClass("active");
        $(this).addClass("active");
        n = $(this).find("span").attr("data-img");
        $(".img_box img").attr("src", n);
        t = $(this).find("span").attr("data-cl");
        $(".chk_color_box .txt-color").text(t);
        $("img.carImage").each(function() {
            this.complete && void 0 !== this.naturalWidth && 0 !== this.naturalWidth || (this.src = "/Content/images/notfound/notfound-images.png")
        });
        i = $(this).find("span").attr("data-price");
        $(".price_detail").html(i)
    }), showOrhideTestDriveButton(), $("a[href*='#form_popup_detail']").on("click", function() {
        setTimeout(function() {
            !1 === CheckIfIsMobile() && $("#txtName").focus()
        }, 800)
    }), 0 == t) && ($(".btn-openSendProduct").on("click", function() {
        var n = getSessionBranchId();
        null != n && void 0 != n && n > 0 ? ($("#checkBranch" + n + "_Pro").prop("checked", !0), $("#hdIsDealerSendMessage").val(n)) : ($("#checkDealerMain_Pro").prop("checked", !0), $("#hdIsDealerSendMessage").val("true"));
        setTimeout(function() {
            $("#txtNamePro").focus()
        }, 500)
    }), $("#ulAccessoriesProduct").length > 0 && loadAccessory(), $(".slide-features").owlCarousel(owlOptionsOperate), $(".slide_img_sm").owlCarousel(owlOptionsEx), $("ul.tabs_vanhanh").tabs(), $("ul.tabs_vanhanh").addClass("tabs"), setTimeout(function() {
        $(".slide_img_sm").find("img").each(function() {
            void 0 == $(this).attr("src") && ($(this).attr("src", $(this).data("src")), $(this).css("opacity", "1"))
        })
    }, 1e3));
    $("img.lazy").lazyload({
        effect: "fadeIn",
        threshold: 200
    });
    loadSpecImage()
});
OpenPopUp()