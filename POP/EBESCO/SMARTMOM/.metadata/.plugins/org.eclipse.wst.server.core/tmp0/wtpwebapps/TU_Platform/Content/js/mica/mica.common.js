﻿jQuery("head").append("<script src='/TU_Platform/Content/js/mica/ajaxService.min.js'>");
jQuery("head").append("<script src='/TU_Platform/Content/js/mica/mica.config.js'>");

var micaCommon = {
    dataSetId: "",
    pageUrl: null,
    post: function (url, data, successFn, errorFn, options)    { ajaxService.post(url, data, successFn, errorFn, options) },
    get: function (url, data, successFn, errorFn, options) { ajaxService.get(url, data, successFn, errorFn, options) },
    put: function (url, data, successFn, errorFn, options)    { ajaxService.pub(url, data, successFn, errorFn, options) },
    delete: function (url, data, successFn, errorFn, options) { ajaxService.delete(url, data, successFn, errorFn, options) },
    dataSetCall: function (dataSetName, obj) {
        Mica.require('dataSet').request(dataSetName, obj)
    },
    bindSetList: function () {
        return Mica.require('dataSet').bindList();
    },
    ajaxGetDataSet: function (url, data, dataSetId, type) {
        this.dataSetId = dataSetId;

        type = type ? type.toLowerCase() : "get";
        switch (type) {
            case "get":
                return ajaxService.setAuth(), $.get(url, data, function (data) {
                    var objectName = Mica.require("dataSet").dataSetList()[micaCommon.dataSetId.toLowerCase()].objectName;
                    var tmpData = {};
                    if (objectName == null) {
                        tmpData = data;
                    } else {
                        tmpData["rows"] = data[objectName];
                    }
                    Mica.require("dataSet").dataSetList()[micaCommon.dataSetId.toLowerCase()].result = tmpData;
                });
                break;
            case "post":
                return ajaxService.setAuth(), $.post(url, data, function (data) {
                    var objectName = Mica.require("dataSet").dataSetList()[micaCommon.dataSetId.toLowerCase()].objectName;
                    var tmpData = {};
                    if (objectName == null) {
                        tmpData = data;
                    } else {
                        tmpData["rows"] = data[objectName];
                    }
                    Mica.require("dataSet").dataSetList()[micaCommon.dataSetId.toLowerCase()].result = tmpData;
                });
                break;
        }
    },
    dataSetReload: function (dataSetId) {
        Mica.require("dataSet").dataSetReload(dataSetId);
    },
    fncS: {
        callBackExec: function (callBack, data, elOptions, options) {
            switch (typeof callBack) {
                case "function":
                    callBack(data, elOptions, options);
                    break;
                case "object":
                    $.each(callBack, function (i, value) {
                        value(data, elOptions, options);
                    });
                    break;
            }
        },
        hierarchyReturn: function (data, hierarchy) {
            if (hierarchy == null) {
                return data;
            }
            var hierarchys = [];
            if (typeof hierarchy == "string") {
                hierarchys = hierarchy.split(".");
            } else {
                hierarchys = hierarchy;
            }

            var nowHierarachy = hierarchys.shift();
            // 위치고민 1
            data = data[nowHierarachy];
            if (data == null) { // sjjo data null 부분 위치 고민 2
                return data;
            }

            if (hierarchys.length > 0) {
                data = this.hierarchyReturn(data, hierarchys);
            }
            return data;
        },
        fncMerge: function (callBack, callBack2, position) {
            // position : merge 시킬 위치. ex : 1 > callBack 1 번째 다음 (순서임) , 0 > 맨처음. 
            // position : 비어있을시 callback 마지막 다음.
            // function을 merge시켜 배열로 리턴.
            var result = [];
            if (callBack != null) { result = this.fncMergeOF(result, callBack) };
            if (callBack2 != null) { result = this.fncMergeOF(result, callBack2, position) };
            return result;
        },
        fncMergeOF: function (result, data, position) {
            result = result || [];
            var tmpPosition = position || result.length;
            switch (typeof data) {
                case "object":
                    $.each(data, function (i, v) {
                        try {
                            Number(i);
                            //result.push(v);
                            result.splice(tmpPosition++, 0, v);
                        }
                        catch (e) {
                            console.error("fncMerge : function or array");
                        }
                    });
                    break;
                case "function":
                    result.splice(tmpPosition++, 0, data);
                    //result.push(data);
                    break;
            }
            return result;
        },
        keyValueSet: function (options) {
            // options : key, data[]
            // [{col1:"1",col2:"2" },{col1:"11", col2:"22"}]
            // key col1
            // {1: {col1:"1", col2:"2"}, 11: {col1:"11", col2:"22"}}
            // toLowerCase : true -> key 무조건 소문자
            // type : obj, array
            // 배열 오브젝트를 키 오브젝트로 바꿔준다.

            var data = options.data;
            var key = options.key;
            var type = options.type || "obj";
            var toLowerCase = options.toLowerCase;

            var result = {};
            $.each(data, function (i, v) {
                if (key) {
                    var resultKey = v[key];
                    if (toLowerCase) {
                        resultKey = resultKey.toLowerCase();
                    }
                    if (type == "array") {
                        if (result[resultKey] == null) {
                            result[resultKey] = [];
                        }
                        result[resultKey].push(v);
                    } else {
                        result[resultKey] = v;
                    }
                } else {
                    var resultKey = v;
                    if (toLowerCase) {
                        resultKey = resultKey.toLowerCase();
                    }
                    if (type == "array") {
                        if (result[resultKey] == null) {
                            result[resultKey] = [];
                        }
                        result[resultKey].push(v);
                    } else {
                        result[resultKey] = v;
                    }
                }
            });
            return result;
        },
        keyValueCancel: function (options) { // keyvalueReturn 을 배열로 해제하여 보내준다.
            var data = options.data;
            var key = options.key;
            var result = [];
            for (var i in data) {
                var dataI = data[i];
                if (key) {
                    dataI[key] = i;
                }
                result.push(dataI);
            }
            return result;
        },
        elObj: function (el) {
            return typeof el == "string" ? $(el) : el;
        },
        randomNum: function (num, end) {
            // num : not null
            // end : null -> num:end. ex:5 -> 0~4
            // end : 5 -> num ~ end(5) , num(start), end(end)
            if (num == null) { return Math.random(); }
            var start = end == null || end < num ? 0 : num;

            end = end + 1 || num * 2;

            var range = end - num;

            var result = Math.floor(Math.random() * range) + start;
            return result;
        },
        rangeNum: function (data) {
            // data : [1,2,3,4,7,8];
            // return : ["1~4", "7~8"];

            data = data.sort(function (a, b) { return a - b; });
            var results = [];
            var result = "";
            var tmp;
            function resultsPush(results, result, tmp) {
                result = result + tmp;
                var resultArray = result.split("~");
                if (resultArray[0] == resultArray[1]) {
                    result = resultArray[0];
                }
                results.push(result);
            }
            $.each(data, function (i, v) {
                if (tmp != v - 1) {
                    if (result.indexOf("~") > -1) {
                        resultsPush(results, result, tmp);
                    }
                    result = v + "~";
                }
                tmp = v;
                if (data.length == i + 1) {
                    resultsPush(results, result, tmp);
                }
            });
            return results;
        },
        byteUnit: function (data) {
            // data(string) : 10MB or 10.3MB ... KB, MB, GB, TB, PB
            // return(number) : 10.3MB ->  10 * 1024 * 1024
            var byte = 1024;
            var byteArray = ["", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
            var pattern = /KB|MB|GB|PB/gi;

            data = data + "";
            var unit = data.match(pattern);
            if (unit) {
                unit = unit[0];
                byte = Math.pow(byte, byteArray.indexOf(unit.toUpperCase()));
                data = Number(data.replace(unit, ""));
                data = data * byte;
            } else {
                data = Number(data);
            }
            if (isNaN(data)) {
                //console.log("Byte Error");
                return -1;
            }
            return data;
        },
        maxUnitByte: function (data, unit) {
            // data(number) : 1023
            // unit(string) : 선택, KB, GB .. PB
            data = Number(data);
            var byte = 1024;
            var byteArray = ["", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
            if (unit == null) {
                var unitNum = data;
                var byteNum = 0;
                while (unitNum > byte - 1) {
                    unitNum = Math.floor(unitNum / byte);
                    byteNum++;
                }
                unit = byteArray[byteNum];
            }
            unit = unit.toUpperCase();
            var unitNum = Math.pow(byte, byteArray.indexOf(unit));
            data = data / unitNum;
            data += "";

            var dataArray = data.split(".");
            if (dataArray.length > 1) {
                var index = dataArray[1].search(/1|2|3|4|5|6|7|8|9/);
                index += 2;
                data = Number(data).toFixed(index);
            }
            data = data + unit;
            return data;
        },
        initialized: function (el, flag) {
            var id = $(el).attr("id");
            if (this.initialized.list == null) {
                this.initialized.list = {};
            }
            if (flag == null) {
                return this.initialized.list[id];
            } else {
                this.initialized.list[id] = flag;
            }
        },
        cssStyleGet: function (cssName, styleName, property) {
            // attribute 내에 정의된 스타일이 아닌 css파일로 정의된 스타일 정보를 가져올수 있다. (실제로 %로 지정되어있는 값도 가능)

            // cssName : css파일 이름
            // styleName : 정의된 스타일의 선택자 -> "div" or ".class"
            // property : 정의된 스타일 이름 - > "width" or "margin-top" ... .. .

            if (cssName == null) {
                return null;
            }
            cssName = cssName.replace(/ /gi, "");
            if (micaCommon.fncS.cssStyleGet.cssObj == null) {
                micaCommon.fncS.cssStyleGet.cssObj = {};
                var styleSheets = document.styleSheets;
                $.each(styleSheets, function (i, v) {
                    if (v.href != null) {
                        var csSName = v.href.split("/");
                        csSName = csSName[csSName.length - 1];
                        csSName = csSName.substr(0, csSName.length - 4).replace(/%20/gi, "");
                        micaCommon.fncS.cssStyleGet.cssObj[csSName] = {};
                        $.each(v.rules, function (ii, vv) {
                            clasSName = vv.selectorText;
                            micaCommon.fncS.cssStyleGet.cssObj[csSName][clasSName] = vv.style;
                        });
                    }
                });
            }
            var result = micaCommon.fncS.cssStyleGet.cssObj;
            if (cssName) {
                result = result[cssName];
                if (styleName && result) {
                    result = result[styleName];
                    if (property && result) {
                        result = result.getPropertyValue(property);
                    } else {
                        result = null;
                    }
                }
            }
            //micaCommon.fncS.cssStyleGet.cssObj[cssName][styleName].getPropertyValue(property);
            return result;
        },
        leadingZeros: function (n, digits) {
            // 숫자 앞에 0을 붙혀줌.
            var zero = '';

            n = n.toString();

            if (n.length < digits) {
                for (i = 0; i < digits - n.length; i++) {
                    zero += '0';
                }
            }

            return zero + n;
        },
        formatNumber: function (text) {
            text = typeof text == "number" ? text + "" : text;
            return text.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        },
        animateNumber: function (el, options) {
            options = options || {};
            var floorNum = options.floorNum || 0;
            var floorNumUnit = Math.pow(10, floorNum);
            var appendStr = options.appendStr || "";
            var value = options.value;
            var elem = $(el);
            var current = Number(elem.html().replace(appendStr, "").replace(",", "")) || 0;
            $({ count: current }).animate({ count: value }, {
                duration: 500,
                step: function (now, fx) {
                    if (floorNumUnit == 1) {
                        elem.text(micaCommon.fncS.formatNumber(String(Math.round(now))) + appendStr);
                    } else {
                        elem.text(micaCommon.fncS.formatNumber(String((Math.floor(now * floorNumUnit) / floorNumUnit).toFixed(floorNum))) + appendStr);
                    }
                }
            });
        }, dateFormat: function (format, date) {
            var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
            var d = date || new Date();
            String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
            String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
            Number.prototype.zf = function (len) { return this.toString().zf(len); };

            return format.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
                switch ($1) {
                    case "yyyy": return d.getFullYear();
                    case "yy": return (d.getFullYear() % 1000).zf(2);
                    case "MM": return (d.getMonth() + 1).zf(2);
                    case "dd": return d.getDate().zf(2);
                    case "E": return weekName[d.getDay()];
                    case "HH": return d.getHours().zf(2);
                    case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
                    case "mm": return d.getMinutes().zf(2);
                    case "ss": return d.getSeconds().zf(2);
                    case "a/p": return d.getHours() < 12 ? "오전" : "오후";
                    default: return $1;
                }
            });
        }
    },
    dataSet: {
        dataSetList: function (dataSetId) {
            return dataSetId ? Mica.require("dataSet").dataSetList()[dataSetId] : Mica.require("dataSet").dataSetList();
        },
        bindList: function (bindId) {
            return bindId ? Mica.require("dataSet").bindList()[bindId] : Mica.require("dataSet").bindList();
        },
        dataSetReload: function (dataSetId) {
            Mica.require("dataSet").dataSetReload(dataSetId);
        },
        parameterChange: function (dataSetId, params) {
            //params : {key: value, key2: value2}
            //var micaCommon.dataSet.dataSetList();
            var dataSet = micaCommon.dataSet.dataSetList()[dataSetId];
            if (dataSet) {
                $.each(params, function (key, value) {
                    var agentParameter = dataSet.agentParameter;
                    $.each(agentParameter, function (i, param) {
                        if (param.name == key) {
                            param.value = value;
                        }
                    });

                });
            } else {
                console.error("dataSet.ParameterSet : Not DataSetId");
            }
        }
    },
    jqGrid: {
        addForm: function (grid, url, mtype, options) {
            var afterCompleteFnc = options.afterComplete;
            var beforeSubmitFnc = options.beforeSubmit;
            var beforeShowFormFnc = options.beforeShowForm;
            var serializeEditDataFnc = options.serializeEditData;
            var urlRowIdFlag = options.urlRowIdFlag || false;
            grid = typeof grid == "string" ? $(grid) : grid;
            grid = grid.is("div") ? grid.find("#table_" + grid.attr("id")) : grid;
            var rowId = options.rowId || "new";
            url = urlRowIdFlag ? url + rowId : url;

            var gridOptions = {
                width: "auto", dataheight: 300,
                url: url, mtype: mtype,
                afterComplete: this.afterCompleteFnc(afterCompleteFnc),
                beforeSubmit: this.beforeSubmitFnc(beforeSubmitFnc),
                beforeShowForm: this.beforeShowFormFnc(beforeShowFormFnc),
                closeAfterAdd: true,
                serializeEditData: this.serializeEditDataFnc(serializeEditDataFnc),
                reloadAfterSubmit: false
                //afterShowForm: function ($form) {
                //    $form.css("width", "");
                //}
            };
            grid.jqGrid("editGridRow", rowId, gridOptions);
        },
        editForm: function (grid, url, mtype, options) {
            var afterCompleteFnc = options.afterComplete;
            var beforeSubmitFnc = options.beforeSubmit;
            var serializeEditDataFnc = options.serializeEditData;
            var urlRowIdFlag = options.urlRowIdFlag || false;
            grid = typeof grid == "string" ? $(grid) : grid;
            grid = grid.is("div") ? grid.find("#table_" + grid.attr("id")) : grid;
            var rowId = grid.jqGrid('getGridParam', "selrow");

            url = urlRowIdFlag ? url + rowId : url;

            var gridOptions = {
                dataheight: 300,
                url: url, mtype: mtype,
                afterComplete: this.afterCompleteFnc(afterCompleteFnc),
                beforeSubmit: this.beforeSubmitFnc(beforeSubmitFnc),
                serializeEditData: this.serializeEditDataFnc(serializeEditDataFnc),
                reloadAfterSubmit: false,
                closeAfterEdit: true,
                afterShowForm: function ($form) {
                    $form.css("width", "");
                }
            };
            if (rowId != null) {
                grid.jqGrid("editGridRow", rowId, gridOptions);
            }
            else
                micaCommon.messageBox({ title: "Edit Form", type: "warning", width: "400", height: "110", html: "Please Select Row" });
            //alert("Please Select Row");

            //grid.jqGrid("editGridRow", rowId, gridOtions);
        },
        delForm: function (grid, url, mtype, options) {
            var afterCompleteFnc = options.afterComplete;
            var beforeSubmitFnc = options.beforeSubmit;
            var serializeDelDataFnc = options.serializeDelData;
            var urlRowIdFlag = options.urlRowIdFlag || false;
            grid = typeof grid == "string" ? $(grid) : grid;
            grid = grid.is("div") ? grid.find("#table_" + grid.attr("id")) : grid;
            var rowId = grid.jqGrid('getGridParam', "selrow");
            url = urlRowIdFlag ? url + rowId : url;

            var rowData = grid.jqGrid('getRowData', rowId);
            var gridOptions = {
                delData: rowData,
                width: "100%", height: "100%", url: url, mtype: mtype,
                afterComplete: this.afterCompleteFnc(afterCompleteFnc),
                beforeSubmit: this.beforeSubmitFnc(beforeSubmitFnc),
                serializeDelData: this.serializeDelDataFnc(serializeDelDataFnc)
            };
            grid.jqGrid("delGridRow", rowId, gridOptions);
        },
        grid: function (grid, options) {
            var pager;
            grid = typeof grid == "string" ? $(grid) : grid;
            if (grid.is("div")) {
                var id = grid.attr("id");
                grid.html("");
                grid.append($("<table/>", { id: "table_" + id }));
                grid.append($("<div/>", { id: "page_" + id }));
                grid = $("#table_" + id);
                pager = $("#page_" + id);

                options.pager = pager;
                //grid.find("#table_" + grid.attr("id")) : grid;
            }

            options.datatype = options.datatype ? options.datatype : "local";
            options.editable = options.editable != null ? options.editable : true;
            //options.pager = options.pager ? 

            grid.jqGrid(options
                //{
                //data: rows,
                //colModel: colModel,
                //}
            );
        },
        afterCompleteFnc: function (afterCompleteFnc) {
            if (afterCompleteFnc) {
                return afterCompleteFnc;
            } else {
                return function (response, postdata, formid) {
                    Mica.require('dataSet').request('all');
                }
            }
        },
        beforeSubmitFnc: function (beforeSubmitFnc) {
            if (beforeSubmitFnc) {
                return beforeSubmitFnc;
            } else {
                return function (postdata, formid) {
                    return [true];
                }
            }
        },
        serializeEditDataFnc: function (serializeEditDataFnc) {
            if (serializeEditDataFnc) {
                return serializeEditDataFnc;
            } else {
                return function (postdata) {
                    return postdata;
                }
            }
        },
        serializeDelDataFnc: function (serializeDelDataFnc) {
            if (serializeDelDataFnc) {
                return serializeDelDataFnc;
            } else {
                return function (postdata) {
                    return postdata;
                }
            }
        },
        beforeShowFormFnc: function (beforeShowFormFnc) {
            if (beforeShowFormFnc) {
                return beforeShowFormFnc;
            } else {
                return function (postdata, formid) {
                    return [true];
                }
            }
        },
    },
    lang: (function (args) {
        var f = function (str) {
            var result = micaCommon.lang.list[str];
            /* [2016-08-31] FOXCONN 특화소스 제거
            if (result == undefined) {
                openMes.langSet();
            }
            */
            //result = result ? result[sessionStorage.LANGUAGE || "KR"] : str;
            result = result ? result[micaConfig.lang || micaConfig.defaultLang] : str;
            result = result || str;
            return result;
        };

        for (i in args) {
            f[i] = args[i];
        }
        return f;
    }
        ({
            list: {}
        }))
    ,
    langSet: function (flag) {
        // flag : true 일시 무조건 다시 리프레쉬 (sessionStorage에서 가져옴)
        // flag : list일수도 있음.
        var list = null;
        if (typeof flag == "object") {
            list = JSON.parse(JSON.stringify(flag));
            flag = true;
        }
        if (flag || micaCommon.lang.list.length == null) {
            if (list != null || localStorage.MULTI_LANGUAGE_DATA != null) {
                //micaCommon.lang.list = micaCommon.fncS.keyValueSet({ data: micaCommon.colRowSet(JSON.parse(sessionStorage.MENUDATA), "Table3"), key: "ID" });
                micaCommon.lang.list = list || micaCommon.fncS.keyValueSet({ data: JSON.parse(localStorage.MULTI_LANGUAGE_DATA), key: "ID" });
            }
        }
    },
    gridIndex: true,
    grid: {
        delMsg: "",
        ajaxFlag: true,
        localData: {},
        langFormOptions: function (options) {

            //$.jgrid.regional["en"].edit.msg.required = "DSSS"
            //options.msg.required = openMes.lang("MU0002");
            //options.required = openMes.lang("MU0002");
            if (micaCommon.lang.list.length < 1) {
                return;
            }
            $.jgrid.regional["en"].edit.msg.required = micaCommon.lang("required");
            $.jgrid.regional["en"].edit.msg.number = micaCommon.lang("number");
            $.jgrid.regional["en"].edit.msg.minValue = micaCommon.lang("minValue");
            $.jgrid.regional["en"].edit.msg.maxValue = micaCommon.lang("maxValue");
            $.jgrid.regional["en"].edit.msg.email = micaCommon.lang("email");
            $.jgrid.regional["en"].edit.msg.integer = micaCommon.lang("integer");
            $.jgrid.regional["en"].edit.msg.date = micaCommon.lang("date");
            $.jgrid.regional["en"].edit.msg.url = micaCommon.lang("url");
            $.jgrid.regional["en"].edit.msg.nodefined = micaCommon.lang("nodefined");
            $.jgrid.regional["en"].edit.msg.novalue = micaCommon.lang("novalue");
            $.jgrid.regional["en"].edit.msg.customarray = micaCommon.lang("customarray");
            $.jgrid.regional["en"].edit.msg.customfcheck = micaCommon.lang("customfcheck");
            //edit = {
            //        addCaption: "Add Record",
            //        editCaption: "Edit Record",
            //        bSubmit: "Submit",
            //        bCancel: "Cancel",
            //        bClose: "Close",
            //        saveData: "Data has been changed! Save changes?",
            //        bYes : "Yes",
            //        bNo : "No",
            //        bExit : "Cancel",
            // form
            options.addCaption = micaCommon.lang("addCaption");
            options.editCaption = micaCommon.lang("editCaption");
            options.bSubmit = micaCommon.lang("bSubmit");
            options.bCancel = micaCommon.lang("bCancel");
            options.bClose = micaCommon.lang("bClose");
            options.saveData = micaCommon.lang("saveData");
            options.bYes = micaCommon.lang("bYes");
            options.bNo = micaCommon.lang("bNo");
            options.bExit = micaCommon.lang("bExit");
            options.delMsg = options.delMsg || micaCommon.lang("delMsg"); // del MSG;
            options.msg = micaCommon.lang("msg"); // del MSG;
            //options.msg = openMes.lang("MU0015");// del MSG;
            options.delChildMsg = micaCommon.lang("delChildMsg"); // del MSG;
            // caption 추가
            options.caption = micaCommon.lang(options.caption);

            options.selMsg = micaCommon.lang(options.selMsg);
            if (options.msg == null) {
                options.msg = {};
            }
            //form
            return options
        },
        langGridSet: function (data, gridOptions, options) {
            micaCommon.langSet();
            $.each(gridOptions.colModel, function (i, v) {
                //var str = openMes.lang.list[v.name];
                var langName = v.label || v.name
                var str = micaCommon.lang(langName);
                if (str) {
                    //str = str[sessionStorage.LANGUAGE];
                    gridOptions.colModel[i].label = str;
                    if (gridOptions.colNames != null) {
                        gridOptions.colNames[i] = str;
                    }
                }
            });
        },
        ajaxSetup: function () {
            if (this.ajaxFlag) {
                $.ajaxSetup({
                    contentType: "application/json; charset=utf-8"
                });
                this.ajaxFlag = false;
            }
        },
        micaForm: function (grid, options) {
            if ($("#micaGridForm").length < 1) {
                $("body").append('<div id="micaGridForm"></div>');
            }
            var div = $('<div id="pop-2" name="pop-2" data-name="pop-2" class="pop-2" style="cursor: default; display: block;">'
		          + '  <div class="pop-header">'
			      + '      <div class="w-icon fa fa-check-square-o pur-icon">'
			      + '      </div>'
			      + '      <div class="h-5">'
				  + '                수요정보'
			      + '      </div>'
			      + '      <a id="pop2" href="#" class="w-inline-block h1-icon-link">'
				  + '          <div class="w-icon fa fa-times h1-icon">'
				  + '          </div>'
			      + '      </a>'
		          + '  </div>'
		          + '  <div class="w-form">'
			      + '      <form id="form-3" name="form-3" data-name="Form 3" class="form-inline">'
				  + '          <ul id="ul-3" class="w-list-unstyled pop-content">'
				  + '              <li class="under-line">'
			  	  + '                <div>'
				  + '	                <ul id="ul" class="w-list-unstyled w-clearfix">'
                  + '                               <li class="w-clearfix w-50-list">'
                  + '                                   <div class="txt-box">'
                  + '                                       <div class="w-icon fa fa-caret-right pur-icon">'
                  + '                                       </div>'
                  + '                                       <div class="pop-txt">'
                  + '                                             Plan ID'
                  + '                                       </div>'
                  + '                                   </div>'
                  + '                                   <select id="vendorId_17"class="select-box">'
                  + '                                         <option value="20151201_P01" selected="selected">20151201_P01</option>'
                  + '                                         <option value="MOBILE">MOBILE </option>'
                  + '                                         <option value="COA01">COA01</option>'
                  + '                                         <option value="Production">Production</option>'
                  + '                                         <option value="Product / Wafer Supplier">Product / Wafer Supplier</option>'
                  + '                                         <option value="Product">Product</option>'
                  + '                                   </select>'
                  + '                               </li>'
                  + '                           </ul>'
                  + '                       </div>'
                  + '                   </li>'
                  + '                   <li class="align-center">'
                  + '                       <a href="#NEW-PLAN-POP" class="w-inline-block star-btn w100">'
                  + '                           <div>'
                  + '                                 저장'
                  + '                           </div>'
                  + '                       </a>'
                  + '                       <a id="pop2-close" href="#NEW-PLAN-POP" class="w-inline-block star-btn w100">'
                  + '                           <div>'
                  + '                                 닫기'
                  + '                           </div>'
                  + '                       </a>'
                  + '                   </li>'
                  + '               </ul>'
                  + '           </form>'
                  + '       </div>'
                  + '   </div>');
            $("#micaGridForm").html(div);
            $("#micaGridForm").hide();
            $.getScript('/micaweb/Content/theme/js/plugins/popup/jquery.blockUI.js', function () {
                $.blockUI({ message: $("#micaGridForm"), onOverlayClick: $.unblockUI });
                //$(".blockMsg").draggable().resizable();
                $(".blockMsg").draggable();
                $(window).trigger('resize');
            });
        },
        addForm: function (grid, url, mtype, options) {
            micaCommon.grid.ajaxSetup();
            url = url || "clientArray";
            options = options || {};
            var afterCompleteFnc = options.afterComplete;
            var beforeSubmitFnc = options.beforeSubmit;
            //edit modal이 클릭시 줄어드는 것을 막음
            //var beforeShowFormFnc = options.beforeShowForm;
            var beforeShowFormFnc = function (formid) {
                $("#FrmGrid_" + grid[0].id).height($("#FrmGrid_" + grid[0].id).outerHeight());
            };
            var serializeEditDataFnc = options.serializeEditData;
            var urlRowIdFlag = options.urlRowIdFlag || false;
            grid = typeof grid == "string" ? $(grid) : grid;
            grid = grid.is("div") ? grid.find("#table_" + grid.attr("id")) : grid;
            var rowId = "new";
            url = urlRowIdFlag ? url + rowId : url;

            var gridOptions = options;
            gridOptions = micaCommon.grid.langFormOptions(options);
            gridOptions.dataheight = gridOptions.dataheight || 300;
            gridOptions.url = url;
            gridOptions.mtype = mtype;
            gridOptions.closeAfterAdd = gridOptions.closeAfterAdd || true;
            gridOptions.reloadAfterSubmit = gridOptions.reloadAfterSubmit || false;
            gridOptions.afterComplete = this.afterCompleteFnc(afterCompleteFnc);
            gridOptions.beforeSubmit = this.beforeSubmitFnc(beforeSubmitFnc);
            gridOptions.beforeShowForm = this.beforeShowFormFnc(beforeShowFormFnc);
            gridOptions.serializeEditData = this.serializeEditDataFnc(serializeEditDataFnc);
            grid.jqGrid("editGridRow", rowId, gridOptions);
        },
        editForm: function (grid, url, mtype, options) {
            micaCommon.grid.ajaxSetup();
            url = url || "clientArray";
            options = options || {};
            var afterCompleteFnc = options.afterComplete;
            var beforeSubmitFnc = options.beforeSubmit;
            var serializeEditDataFnc = options.serializeEditData;
            //edit modal이 클릭시 줄어드는 것을 막음
            var beforeShowFormFnc = function (formid) {
                $("#FrmGrid_" + grid[0].id).height($("#FrmGrid_" + grid[0].id).outerHeight());
            };
            var urlRowIdFlag = options.urlRowIdFlag || false;
            grid = typeof grid == "string" ? $(grid) : grid;
            grid = grid.is("div") ? grid.find("#table_" + grid.attr("id")) : grid;
            var rowId = grid.jqGrid('getGridParam', "selrow");

            url = urlRowIdFlag ? url + rowId : url;

            var gridOptions = options;
            gridOptions = micaCommon.grid.langFormOptions(options);
            gridOptions.dataheight = gridOptions.dataheight || 300;
            gridOptions.url = url;
            gridOptions.mtype = mtype;
            gridOptions.closeAfterEdit = gridOptions.closeAfterEdit || true;
            gridOptions.reloadAfterSubmit = gridOptions.reloadAfterSubmit || false;
            gridOptions.afterComplete = this.afterCompleteFnc(afterCompleteFnc);
            gridOptions.beforeSubmit = this.beforeSubmitFnc(beforeSubmitFnc);
            gridOptions.beforeShowForm = this.beforeShowFormFnc(beforeShowFormFnc);
            gridOptions.serializeEditData = this.serializeEditDataFnc(serializeEditDataFnc);

            if (rowId != null) {
                grid.jqGrid("editGridRow", rowId, gridOptions);
            }
            else {
                var selMsg = options.selMsg || micaCommon.lang("M_NotSelectedRow");
                micaCommon.messageBox({ title: "Edit Form", type: "warning", width: "400", height: "110", html: selMsg });
                //alert(selMsg);
            }

            //grid.jqGrid("editGridRow", rowId, gridOtions);
        },
        delForm: function (grid, url, mtype, options) {
            micaCommon.grid.ajaxSetup();
            url = url || "clientArray";
            options = options || {};
            var afterCompleteFnc = options.afterComplete;
            var beforeSubmitFnc = options.beforeSubmit;
            var serializeDelDataFnc = options.serializeDelData;
            var urlRowIdFlag = options.urlRowIdFlag || false;
            grid = typeof grid == "string" ? $(grid) : grid;
            grid = grid.is("div") ? grid.find("#table_" + grid.attr("id")) : grid;
            var rowId = grid.jqGrid('getGridParam', "selrow");
            url = urlRowIdFlag ? url + rowId : url;

            var rowData = grid.jqGrid('getRowData', rowId);
            micaCommon.grid.delMsg = options.msg;
            var beforeShowForm = function ($form) {
                $("td.delmsg", $form[0]).html(micaCommon.grid.delMsg);
            };

            var gridOptions = options;
            gridOptions = micaCommon.grid.langFormOptions(options);
            gridOptions.delData = rowData;
            gridOptions.width = "100%", gridOptions.height = "100%";
            gridOptions.url = url;
            gridOptions.mtype = mtype;
            gridOptions.afterComplete = this.afterCompleteFnc(afterCompleteFnc);
            gridOptions.beforeSubmit = this.beforeSubmitFnc(beforeSubmitFnc);
            gridOptions.serializeDelData = this.serializeDelDataFnc(serializeDelDataFnc);
            gridOptions.beforeShowForm = beforeShowForm;

            if (rowId != null) {
                grid.jqGrid("delGridRow", rowId, gridOptions);
                return rowId;
            }
            else {
                var selMsg = options.selMsg || micaCommon.lang("M_NotSelectedRow");
                micaCommon.messageBox({ title: "Delete", type: "warning", width: "400", height: "110", html: selMsg });
                //alert(selMsg);
            }

            // grid.jqGrid("delGridRow", rowId, gridOptions);
            // return rowId;
        },
        inlineRowIds: {},
        inlineRowNum: 0,
        addInline: function (grid, options) {
            options = options || {};
            options.addOnlyOne = options.addOnlyOne || false;
            micaCommon.grid.ajaxSetup();
            grid = typeof grid == "string" ? $(grid) : grid;
            grid = grid.is("div") ? grid.find("#table_" + grid.attr("id")) : grid;
            if (options.addOnlyOne == false || (options.addOnlyOne == true && grid.find(".fa.fa-plus").length == 0)) {
                var rowId = "inlineNew" + this.inlineRowNum++;
                if (this.inlineRowIds[grid.attr("id")] == null) { this.inlineRowIds[grid.attr("id")] = {} }
                this.inlineRowIds[grid.attr("id")][rowId] = "add";

                this.inlIneState(grid, rowId);
                grid.jqGrid('addRow', { rowID: rowId }, true);
            }
        },
        editInline: function (grid, rowId, options) {
            options = options == null ? true : options;

            micaCommon.grid.ajaxSetup();
            grid = typeof grid == "string" ? $(grid) : grid;
            grid = grid.is("div") ? grid.find("#table_" + grid.attr("id")) : grid;
            rowId = rowId || grid.jqGrid('getGridParam', "selrow");
            if (this.inlineRowIds[grid.attr("id")] == null) { this.inlineRowIds[grid.attr("id")] = {} }
            if (this.inlineRowIds[grid.attr("id")][rowId] == "add" || this.inlineRowIds[grid.attr("id")][rowId] == "del") {
            } else {
                this.inlineRowIds[grid.attr("id")][rowId] = "edit";
            }
            this.inlIneState(grid, rowId);
            grid.jqGrid('editRow', rowId, options);
        },
        delInline: function (grid, rowIds) {
            micaCommon.grid.ajaxSetup();
            grid = typeof grid == "string" ? $(grid) : grid;
            rowIds = rowIds || [grid.jqGrid('getGridParam', "selrow")];
            if (this.inlineRowIds[grid.attr("id")] == null) { this.inlineRowIds[grid.attr("id")] = {} }
            for (var i = 0; i < rowIds.length; i++) {
                var rowId = rowIds[i];
                var addDelFlag = true;
                if (this.inlineRowIds[grid.attr("id")][rowId] == "add") {
                    micaCommon.grid.get(grid, "delRowData", rowId);
                    delete this.inlineRowIds[grid.attr("id")][rowId];
                    addDelFlag = false;
                } else {
                    this.inlineRowIds[grid.attr("id")][rowId] = "del";
                }
                if (!this.inlIneState(grid, rowId) && addDelFlag) {
                    var url = "clientArray";
                    var mtype = null;
                    var options = {};
                    this.delForm(grid, url, mtype, options);
                }
            }
        },
        saveInline: function (grid, rowIds) {
            micaCommon.grid.ajaxSetup();
            grid = typeof grid == "string" ? $(grid) : grid;
            grid = grid.is("div") ? grid.find("#table_" + grid.attr("id")) : grid;
            rowIds = rowIds || [];
            if (rowIds.length > 0) {
                $.each(rowIds, function (i, v) {
                    grid.jqGrid("saveRow", i, null, "clientArray");
                });
            } else {
                if (this.inlineRowIds[grid.attr("id")] != null) {
                    $.each(this.inlineRowIds[grid.attr("id")], function (i, v) {
                        grid.jqGrid("saveRow", i, null, "clientArray");
                    });
                }
            }
        },
        getInlineRow: function (grid, selIds) {
            grid = typeof grid == "string" ? $(grid) : grid;
            grid = grid.is("div") ? grid.find("#table_" + grid.attr("id")) : grid;
            selIds = selIds || "all";

            var result = { add: [], edit: [], del: [] };

            if (this.inlineRowIds[grid.attr("id")]) {
                if (selIds == "all") {
                    $.each(this.inlineRowIds[grid.attr("id")], function (i, v) {
                        result[v].push(micaCommon.grid.get(grid, "getRowData", i));
                    });
                } else {
                    var idKey = {};
                    $.each(selIds, function (i, v) {
                        idKey[v] = true;
                    });
                    $.each(this.inlineRowIds[grid.attr("id")], function (i, v) {
                        if (idKey[i]) {
                            result[v].push(micaCommon.grid.get(grid, "getRowData", i));
                        }
                    });
                }
            }
            return result;

        },
        set: function (grid, gridOptions, options, callBack) {
            // gridOptions : jqGrid options
            // options : url, mtype, data(postData), rowsName(resultDataName) , ----columnName--- , 
            // callBack : before(function, [function]) , after(function, [function]) -> param = data, gridOptions, options
            grid = typeof grid == "string" ? $(grid) : grid;
            //grid = grid.is("div") ? grid.find("#table_" + grid.attr("id")) : grid;

            gridOptions = gridOptions || {};
            if (gridOptions.viewrecords == null) {
                gridOptions.viewrecords = true;
            }
            options = options || {};
            options.grid = grid;
            callBack = callBack || {};

            var that = this;
            var id = grid.attr("id");
            if (options.urlPaging) {
                options.urlPaging = options.url + "";
                delete options.url;
                this.urlPagingSet(grid, gridOptions, options);
            }

            var inlineFlag = options.inlineFlag == null ? false : options.inlineFlag;
            if (inlineFlag) {
                callBack.before = micaCommon.fncS.fncMerge(micaCommon.grid.inlineColumnSet, callBack.before, 0);
            }
            var langLength = 0;
            $.each(micaCommon.lang.list, function (i, v) {
                langLength++;
            });
            if (langLength > 0) {
                callBack.before = micaCommon.fncS.fncMerge(micaCommon.grid.langGridSet, callBack.before, 0);
            }
            var errorFnc = options.errorFnc || function (jqXHR, textStatus, errorThrown) {
                var str = jqXHR.status;
                str += " : " + jqXHR.statusText;
                micaCommon.notication.open("error", str);
            }
            if (options.url != null) {
                this.getData(options).done(function (data) {
                    // options, gridOptions;
                    //2016-02-01 :sy. data가 string일 경우 json 형태로 바꿔줌
                    if (options.rowsName == null) {
                        if (typeof (data) == "string") {
                            data = JSON.parse(data);
                        }
                    } else {
                        if (typeof (data[options.rowsName]) == "string") {
                            data[options.rowsName] = JSON.parse(data[options.rowsName]);
                        }
                    }
                    if (micaCommon.grid.setGridOptions(data, gridOptions, options)) {
                        if (callBack.exception) {
                            micaCommon.grid.callBackExec(callBack.exception, data, gridOptions, options);
                        } else {
                            micaCommon.notication.open("warning", "No Data");
                        }
                        return;
                    }
                    micaCommon.grid.callBackExec(callBack.before, data, gridOptions, options);
                    grid = micaCommon.grid.setGrid(grid, gridOptions);
                    micaCommon.grid.setNav(grid, gridOptions, options);
                    micaCommon.grid.callBackExec(callBack.after, data, gridOptions, options);
                    $(".jqx-splitter").trigger("resize");
                }).fail(errorFnc);
            } else {
                data = gridOptions.data;
                if (micaCommon.grid.setGridOptions(data, gridOptions, options)) {
                    if (callBack.exception) {
                        micaCommon.grid.callBackExec(callBack.exception, data, gridOptions, options);
                    } else {
                        micaCommon.notication.open("warning", "No Data");
                    }
                    return;
                }
                this.callBackExec(callBack.before, data, gridOptions, options);
                grid = this.setGrid(grid, gridOptions);
                this.setNav(grid, gridOptions, options);
                this.callBackExec(callBack.after, data, gridOptions, options);
                $(".jqx-splitter").trigger("resize");
            }
        },
        urlPagingSet: function (grid, gridOptions, options) {
            var that = this;
            var param = {rowNum: gridOptions.rowNum || 15,
                page: 1,
                sortname: "",
                sortorder: ""
            }
            var url = options.urlPaging;
            this.urlPagingAjax(grid.attr("id"), param, url, options.mtype);
            gridOptions.data = this.localData[grid.attr("id")].rows;
            gridOptions.datatype = "local";
            gridOptions.gridview = true;

            gridOptions.localReader = {
                root: "rows",
                page: function (object) { return that.localData[grid.attr("id")].page },
                total: function (object) { return that.localData[grid.attr("id")].total },
                records: function (object) { return that.localData[grid.attr("id")].records },
                repeatitems: false
            };
            //page 이동 버튼을 클릭했을 때 발생하는 event 처리
            gridOptions.onPaging = function (e) {
                var result = {
                    rowNum: micaCommon.grid.get($(this), "getGridParam", "rowNum"),
                    page: micaCommon.grid.get($(this), "getGridParam", "page"),
                    sortname: micaCommon.grid.get($(this), "getGridParam", "sortname"),
                    sortorder: micaCommon.grid.get($(this), "getGridParam", "sortorder")
                }
                switch (e) {
                    case "next":
                        result.page = result.page + 1;
                        break;
                    case "last":
                        result.page = that.localData[grid.attr("id")].total;
                        break;
                    case "prev":
                        result.page = result.page - 1;
                        break;
                    case "first":
                        result.page = 1;
                        break;
                }
                //event에 따른 localReader 변화
                $(this).setGridParam({
                    data: that.localData[grid.attr("id")].rows,
                    page: result.page,
                    localReader: {
                        root: function (object) { return that.localData[grid.attr("id")].rows },
                        page: function (object) { return result.page },
                        total: function (object) { return that.localData[grid.attr("id")].total },
                        records: function (object) { return that.localData[grid.attr("id")].records }
                    }
                }).trigger('reloadGrid');
                that.urlPagingAjax($(this).attr("id"), result, url, options.mtype);
            }
            gridOptions.onSortCol = function (index, columnIndex, sortOrder) {
                var result = {
                    rowNum: micaCommon.grid.get($(this), "getGridParam", "rowNum"),
                    page: micaCommon.grid.get($(this), "getGridParam", "page"),
                    sortname: micaCommon.grid.get($(this), "getGridParam", "sortname"),
                    sortorder: micaCommon.grid.get($(this), "getGridParam", "sortorder")
                }

                $(this).setGridParam({
                    data: that.localData[grid.attr("id")].rows,
                    page: result.page,
                    localReader: {
                        root: function (object) { return that.localData[grid.attr("id")].rows },
                        page: function (object) { return result.page },
                        total: function (object) { return that.localData[grid.attr("id")].total },
                        records: function (object) { return that.localData[grid.attr("id")].records }
                    }
                }).trigger('reloadGrid');

                that.urlPagingAjax($(this).attr("id"), result, url, options.mtype);
            }
        },
        urlPagingAjax: function (id, param, url, type) {
            var that = this;
            $.ajax({
                url: url,
                type: type || "post",
                data: param,
                async: false,
                success: function (data) {
                    if (typeof data == "string") {
                        data = JSON.parse(data);
                    }
                    that.localData[id] = data;
                }
            });
        },
        inlineColumnSet: function (data, gridOptions, options) {
            var colModel = {
                name: "state",
                width: "50px",
                align: "center",
                formatter: function (cellvalue, options, rowObject) {
                    var result = '<div class="fa fa-#{icon}"></div>';
                    switch (cellvalue) {
                        case "add":
                            result = result.replace(/#{icon}/gi, "plus");
                            break;
                        case "edit":
                            result = result.replace(/#{icon}/gi, "check");
                            break;
                        case "del":
                            result = result.replace(/#{icon}/gi, "minus");
                            break;
                    }
                    return result;
                }
            };
            gridOptions.colModel.splice(0, 0, colModel)
        },
        inlIneState: function (grid, rowId) {
            var result = false;
            if (micaCommon.grid.get(grid, "getRowData", rowId)["state"] != null) {
                grid.jqGrid('setCell', rowId, 'state', this.inlineRowIds[grid.attr("id")][rowId]);
                result = true;
            }
            return result;
        },
        callBackExec: function (callBack, data, gridOptions, options) {
            switch (typeof callBack) {
                case "function":
                    callBack(data, gridOptions, options);
                    break;
                case "object":
                    $.each(callBack, function (i, value) {
                        value(data, gridOptions, options);
                    });
                    break;
            }
        },
        setGrid: function (grid, gridOptions) {
            var pager;
            grid = typeof grid == "string" ? $(grid) : grid;
            if (grid.is("div")) {
                var id = grid.attr("id");
                grid.html("");
                grid.append($("<table/>", { id: "table_" + id }));
                grid.append($("<div/>", { id: "page_" + id }));
                grid = $("#table_" + id);
                pager = $("#page_" + id);

                gridOptions.pager = pager;
                //grid.find("#table_" + grid.attr("id")) : grid;
            }
            //options.pager = options.pager ? 

            grid.jqGrid(gridOptions);
            return grid;
        },
        setNav: function (grid, gridOptions, options) {
            if (gridOptions.pager) {
                setTimeout(function () {
                    var navGrid = {};
                    grid.jqGrid('navGrid', gridOptions.pager,
                        { 	//navbar options
                            edit: navGrid.edit ? true : false, edittext: "edit",
                            editicon: 'fa fa-pencil text-blue',
                            add: navGrid.add ? true : false, addtext: "add",
                            addicon: 'fa fa-plus-circle text-purple',
                            del: navGrid.del ? true : false, deltext: "del",
                            delicon: 'fa fa-trash-o text-red',
                            search: navGrid.search ? true : false, searchtext: "search",
                            searchicon: 'fa fa-search text-orange',
                            refresh: navGrid.refresh ? true : false, refreshtext: "refresh",
                            refreshicon: 'fa-refresh text-green',
                            view: navGrid.view ? true : false, viewtext: "view",
                            viewicon: 'fa fa-search-plus text-grey'
                        });
                    if (options.excel && gridOptions.pager) {
                        grid.jqGrid('navButtonAdd', gridOptions.pager, {
                            caption: "Excel",
                            buttonicon: "fa fa-file-excel-o",
                            onClickButton: function () {
                                micaCommon.grid.download.xlsx($(this));
                            },
                            position: "last"
                        });
                    };
                }, 0);
            }
        },
        getData: function (options) {
            var url = options.url, mtype = options.mtype || "post", data = options.data;
            return ajaxService(data, url, null, mtype);
        },
        setGridOptions: function (data, gridOptions, options) {
            var rows = micaCommon.fncS.hierarchyReturn(data, options.rowsName);

            gridOptions.datatype = gridOptions.datatype ? gridOptions.datatype : "local";
            gridOptions.editable = gridOptions.editable != null ? gridOptions.editable : true;

            gridOptions.data = rows;
            if (rows == null) {
                return true;
            }
            if (gridOptions.colModel != null) { return false; };
            if (rows.length < 1) { return false; };
            var colModel = [];
            $.each(rows[0], function (i, row) {
                colModel.push({ name: i, editable: true });
            });

            gridOptions.colModel = colModel;

            //return gridOptions;
        },
        afterCompleteFnc: function (afterCompleteFnc) {
            if (afterCompleteFnc) {
                return afterCompleteFnc;
            } else {
                return function (response, postdata, formid) {
                    Mica.require('dataSet').request('all');
                }
            }
        },
        beforeSubmitFnc: function (beforeSubmitFnc) {
            if (beforeSubmitFnc) {
                return beforeSubmitFnc;
            } else {
                return function (postdata, formid) {
                    return [true];
                }
            }
        },
        beforeShowFormFnc: function (beforeShowFormFnc) {
            if (beforeShowFormFnc) {
                return beforeShowFormFnc;
            } else {
                return function (formid) {
                    return [true];
                }
            }
        },
        serializeEditDataFnc: function (serializeEditDataFnc) {
            if (serializeEditDataFnc) {
                return serializeEditDataFnc;
            } else {
                return function (postdata) {
                    return postdata;
                }
            }
        },
        serializeDelDataFnc: function (serializeDelDataFnc) {
            if (serializeDelDataFnc) {
                return serializeDelDataFnc;
            } else {
                return function (postdata) {
                    return postdata;
                }
            }
        },
        get: (
            function (args) {
                var f = function (grid, pin, subpin) {
                    grid = typeof grid == "string" ? $(grid) : grid;
                    var result = [];
                    if (subpin) {
                        result = grid.jqGrid(pin, subpin);
                    } else {
                        result = grid.jqGrid(pin);
                    }
                    return result;
                };

                for (i in args) {
                    f[i] = args[i];
                }
                return f;
            }
            ({
                data: function (grid) {
                    grid = typeof grid == "string" ? $(grid) : grid;
                    return micaCommon.grid.get(grid, "getRowData");
                },
                all: function (grid) {
                    grid = typeof grid == "string" ? $(grid) : grid;
                    return micaCommon.grid.get(grid, "getGridParam").data;
                },
                selData: function (grid) {
                    grid = typeof grid == "string" ? $(grid) : grid;
                    //var rowIds = micaCommon.grid.get(grid, "getGridParam", "selarrrow");
                    //var rowId = micaCommon.grid.get(grid, "getGridParam", "selrow") || "";
                    //if (rowIds == null) {
                    //    rowIds = [rowId];
                    //} else if (rowIds.length > 0) {

                    //} else if (rowId.length > 0) {
                    //    rowIds = [rowId];
                    //}
                    var rowIds = micaCommon.grid.get.selIds(grid);
                    var result = [];
                    $.each(rowIds, function (i, value) {
                        if (rowIds[i] == "")
                            return true;
                        result.push(micaCommon.grid.get(grid, "getRowData", value));
                    });
                    //var rowId = micaCommon.grid.get(grid, "getGridParam", "selrow");
                    //return micaCommon.grid.get(grid, "getRowData", rowId);
                    return result;
                },
                selIds: function (grid) {
                    grid = typeof grid == "string" ? $(grid) : grid;
                    var rowIds = micaCommon.grid.get(grid, "getGridParam", "selarrrow");
                    var rowId = micaCommon.grid.get(grid, "getGridParam", "selrow") || "";
                    if (rowIds == null) {
                        rowIds = [rowId];
                    } else if (rowIds.length > 0) {

                    } else if (rowId.length > 0) {
                        rowIds = [rowId];
                    }
                    return rowIds;
                }
            })
        ),
        rowspanTmp: {},
        rowspanHide: "",
        rowspanHideObj: {},
        rowspan: function (grid, colIdx, endIdx) {
            grid = typeof grid == "string" ? $(grid) : grid;
            endIdx = endIdx || colIdx;
            //grid.jqGrid("setGridParam", { mergeColumn: { start: colIdx, end: endIdx } });
            var mergeColumn = grid.jqGrid("getGridParam").mergeColumn;
            var mergeName = colIdx + "" + endIdx;
            if (mergeColumn != null) {
                if (mergeColumn.def != null) {
                    mergeColumn = {}
                    mergeColumn[mergeName] = { start: colIdx, end: endIdx };
                    grid.jqGrid("setGridParam", { mergeColumn: mergeColumn });
                } else {
                    mergeColumn[mergeName] = { start: colIdx, end: endIdx };
                    grid.jqGrid("setGridParam", { mergeColumn: mergeColumn });
                }
            } else {
                mergeColumn = {}
                mergeColumn[mergeName] = { start: colIdx, end: endIdx };
                grid.jqGrid("setGridParam", { mergeColumn: mergeColumn });
            }
            endIdx += 1;
            var thats = {};
            micaCommon.grid.rowspanTmp = {};
            micaCommon.grid.rowspanHide = "";
            $("tr", grid).each(function (row) {
                for (var i = colIdx; i < endIdx; i++) {
                    var that = thats[i];
                    $("td:eq(" + i + ")", this).filter(":visible").each(function (col) {
                        if ($(this).attr("rowspan") != null) {
                            return;
                        }
                        $(this).uniqueId();
                        if ($(this).html() == $(that).html()
                        && ($(this).prev().html() == $(that).prev().html() || i == colIdx && $(this).html() == $(that).html())
                        ) {
                            //$(that).uniqueId();
                            //if ($(that).prev().is(":hidden") && !$(this).prev().is(":hidden")) {
                            var thatPrevId = $(that).prev().attr("id");
                            var thisPrevId = $(this).prev().attr("id");
                            if (micaCommon.grid.rowspanHideObj[thatPrevId] == null && micaCommon.grid.rowspanTmp[thisPrevId] != null
                                //){
                                || micaCommon.grid.rowspanHideObj[thatPrevId] && micaCommon.grid.rowspanTmp[thisPrevId] != null) {
                                that = this;
                                micaCommon.grid.rowspanTmp[that.id] = micaCommon.grid.rowspanTmp[that.id] + 1 || 1;
                            } else {
                                //rowspan = $(that).attr("rowspan") || 1;
                                //rowspan = Number(rowspan) + 1;
                                //$(that).attr("rowspan", rowspan);
                                //$(this).hide();

                                rowspan = micaCommon.grid.rowspanTmp[that.id] + 1 || 2;
                                micaCommon.grid.rowspanTmp[that.id] = rowspan;

                                micaCommon.grid.rowspanHide += "#" + this.id + ",";
                                micaCommon.grid.rowspanHideObj[this.id] = true;
                            }

                        } else {
                            that = this;
                            micaCommon.grid.rowspanTmp[that.id] = 1;
                        }
                        // set the that if not already set 
                        that = (that == null) ? this : that;
                    });
                    thats[i] = that;
                }
            });
            micaCommon.grid.rowspanHide = micaCommon.grid.rowspanHide.substr(0, micaCommon.grid.rowspanHide.length - 1);
            $(micaCommon.grid.rowspanHide).hide();
            $.each(micaCommon.grid.rowspanTmp, function (i, v) {
                $("#" + i).attr("rowspan", v);
            });
        },
        colspan: function (grid, rowIdx) {
            var that;
            grid = typeof grid == "string" ? $(grid) : grid;
            $("tr", grid).filter(":eq(" + rowIdx + ")").each(function (row) {
                $(this).find("th").filter(":visible").each(function (col) {
                    if ($(this).html() == $(that).html()) {
                        colspan = $(that).attr("colSpan") || 1;
                        colspan = Number(colspan) + 1;

                        $(that).attr("colSpan", colspan);
                        $(this).hide(); // .re(); 
                    } else {
                        that = this;
                    }

                    // set the that if not already set 
                    that = (that == null) ? this : that;

                });
            });
        },
        download: (
            function (args) {
                var f = function (el, options) {
                    options = options || {};
                    options.grid = "grid";
                    if (options.name == null) {
                        options.name = "export";
                    }
                    var type = options.type || "xlsx";
                    switch (type) {
                        case "xlsx":
                            el = typeof el == "string" ? $(el) : el;
                            micaCommon.download.xlsx(el, options);
                            break;
                    }
                };

                for (i in args) {
                    f[i] = args[i];
                }
                return f;
            }
            ({
                xlsx: function (el) {
                    el = typeof el == "string" ? $(el) : el;
                    var flag = el.hasClass("w-widget");
                    flag = flag || el.hasClass("w-widget-jqgrid");
                    var divFlag = el[0].tagName.toLowerCase() == "div";
                    flag = flag && divFlag;
                    if (flag) {
                        el = el.find("#table_" + el.attr("id"));
                    }
                    var data = el.jqGrid("getGridParam");
                    //if (data.data.length < 1) {
                    data.data = el.jqGrid("getRowData");
                    //}
                    gridToExcel(data);
                }
            })
            ),
        setKeyValue: function (els) {
            if (typeof (els) == 'object') {
                $.each(els, function (index, value) {
                    $(els).removeClass("modal-disabled");
                    $(value).addClass("modal-key-value");
                    $(value).attr("disabled", false);
                });
            } else if (typeof (els) == 'string') {
                $(els).removeClass("modal-disabled");
                $(els).addClass("modal-key-value");
                $(els).attr("disabled", false);
            }
        },
        setDisabledValue: function (els) {
            if (typeof (els) == 'object') {
                $.each(els, function (index, value) {
                    $(els).removeClass("modal-key-value");
                    $(value).addClass("modal-disabled");
                    $(value).attr("disabled", true);
                });
            } else if (typeof (els) == 'string') {
                $(els).removeClass("modal-key-value");
                $(els).addClass("modal-disabled");
                $(els).attr("disabled", true);
            }
        }
    },
    pivotGrid: {
        pivotData: [],
        set: function (grid, pivotOptions, gridOptions, options, callBack) {
            // pivotOptions : jqPivot options
            // gridOptions : jqGrid options
            // options : url, mtype, data(postData), rowsName(resultDataName) , ----columnName--- , 
            // callBack : before(function, [function]) , after(function, [function]) -> param = data, gridOptions, options
            grid = typeof grid == "string" ? $(grid) : grid;

            pivotOptions = pivotOptions || {};
            gridOptions = gridOptions || {};
            options = options || {};
            options.grid = grid;
            callBack = callBack || {};
            if (options.url != null) {
                this.getData(options).done(function (data) {
                    options, gridOptions;
                    //2016-02-01 :sy. data가 string일 경우 json 형태로 바꿔줌
                    if (options.rowsName == null) {
                        if (typeof (data) == "string") {
                            data = JSON.parse(data);
                        }
                    } else {
                        if (typeof (data[options.rowsName]) == "string") {
                            data[options.rowsName] = JSON.parse(data[options.rowsName]);
                        }
                    }
                    if (micaCommon.pivotGrid.setGridOptions(data, gridOptions, options)) {
                        if (callBack.exception) {
                            micaCommon.grid.callBackExec(callBack.exception, data, gridOptions, options);
                        } else {
                            micaCommon.notication.open("warning", "No Data");
                        }
                        return;
                    }
                    micaCommon.grid.callBackExec(callBack.before, data, gridOptions, options);
                    micaCommon.pivotGrid.setGrid(grid, pivotData, pivotOptions, gridOptions);
                    micaCommon.grid.callBackExec(callBack.after, data, gridOptions, options);
                });
            } else {
                data = gridOptions.data;
                if (micaCommon.pivotGrid.setGridOptions(data, gridOptions, options)) {
                    if (callBack.exception) {
                        micaCommon.grid.callBackExec(callBack.exception, data, gridOptions, options);
                    } else {
                        micaCommon.notication.open("warning", "No Data");
                    }
                    return;
                }
                micaCommon.grid.callBackExec(callBack.before, data, gridOptions, options);
                this.setGrid(grid, data, pivotOptions, gridOptions);
                micaCommon.grid.callBackExec(callBack.after, data, gridOptions, options);
            }
        },
        setGrid: function (grid, data, pivotOptions, gridOptions) {
            var pager;
            grid = typeof grid == "string" ? $(grid) : grid;
            if (grid.is("div")) {
                var id = grid.attr("id");
                grid.html("");
                grid.append($("<table/>", { id: "table_" + id }));
                grid.append($("<div/>", { id: "page_" + id }));
                grid = $("#table_" + id);
                pager = $("#page_" + id);

                gridOptions.pager = pager;
            }

            grid.jqGrid('jqPivot', data, pivotOptions, gridOptions);
            //excel export에서 merge를 사용하기 위한 항목
            grid.jqGrid("setGridParam", { mergeColumn: { start: 0, end: pivotOptions.xDimension.length - 1 } });
        },
        getData: function (options) {
            var url = options.url, mtype = options.mtype || "post", data = options.data;
            return ajaxService(data, url, null, mtype);
        },
        setGridOptions: function (data, gridOptions, options) {
            var rows = micaCommon.fncS.hierarchyReturn(data, options.rowsName);

            //gridOptions.datatype = gridOptions.datatype ? gridOptions.datatype : "local";
            //gridOptions.editable = gridOptions.editable != null ? gridOptions.editable : true;

            pivotData = rows;
            if (rows == null) {
                return true;
            }

            //if (gridOptions.colModel != null) { return false; };
            //if (rows.length < 1) { return false; }
            //var colModel = [];
            //$.each(rows[0], function (i, row) {
            //    colModel.push({ name: i, editable: true });
            //});

            //gridOptions.colModel = colModel;

            //return gridOptions;
        },
        download: (
           function (args) {
               var f = function (el, options) {
                   options = options || {};
                   options.grid = "pivot";
                   if (options.name == null) {
                       options.name = "export";
                   }
                   var type = options.type || "xlsx";
                   switch (type) {
                       case "xlsx":
                           el = typeof el == "string" ? $(el) : el;
                           micaCommon.download.xlsx(el, options);
                           break;
                   }
               };

               for (i in args) {
                   f[i] = args[i];
               }
               return f;
           }
           ({
               xlsx: function (el) {
                   el = typeof el == "string" ? $(el) : el;
                   var flag = el.hasClass("w-widget");
                   flag = flag || el.hasClass("w-widget-jqgrid");
                   var divFlag = el[0].tagName.toLowerCase() == "div";
                   flag = flag && divFlag;
                   if (flag) {
                       el = el.find("#table_" + el.attr("id"));
                   }
                   var data = el.jqGrid("getGridParam");
                   if (data.data.length < 1) {
                       data.data = el.jqGrid("getRowData");
                   }
                   gridToExcel(el.jqGrid("getGridParam"));
               }
           })
           )
    },
    treeGrid: {
        delMsg: "",
        addForm: function (grid, url, mtype, options) {
            micaCommon.grid.ajaxSetup();
            url = url || "clientArray";
            options = options || {};
            var afterCompleteFnc = options.afterComplete;
            var beforeSubmitFnc = options.beforeSubmit;
            var serializeEditDataFnc = options.serializeEditData;
            var urlRowIdFlag = options.urlRowIdFlag || false;
            grid = typeof grid == "string" ? $(grid) : grid;
            grid = grid.is("div") ? grid.find("#table_" + grid.attr("id")) : grid;
            var rowId = "new";
            url = urlRowIdFlag ? url + rowId : url;

            var gridOptions = options;
            gridOptions.dataheight = gridOptions.dataheight || 300;
            gridOptions.url = url;
            gridOptions.mtype = mtype;
            gridOptions.closeAfterAdd = gridOptions.closeAfterAdd || true;
            gridOptions.reloadAfterSubmit = gridOptions.reloadAfterSubmit || false;
            gridOptions.afterComplete = micaCommon.grid.afterCompleteFnc(afterCompleteFnc);
            gridOptions.beforeSubmit = micaCommon.grid.beforeSubmitFnc(beforeSubmitFnc);
            gridOptions.serializeEditData = micaCommon.grid.serializeEditDataFnc(serializeEditDataFnc);
            grid.jqGrid("editGridRow", rowId, gridOptions);

        },
        editForm: function (grid, url, mtype, options) {
            micaCommon.grid.ajaxSetup();
            url = url || "clientArray";
            options = options || {};
            var afterCompleteFnc = options.afterComplete;
            var beforeSubmitFnc = options.beforeSubmit;
            var serializeEditDataFnc = options.serializeEditData;
            var urlRowIdFlag = options.urlRowIdFlag || false;
            grid = typeof grid == "string" ? $(grid) : grid;
            grid = grid.is("div") ? grid.find("#table_" + grid.attr("id")) : grid;
            var rowId = grid.jqGrid('getGridParam', "selrow");

            url = urlRowIdFlag ? url + rowId : url;

            var gridOptions = options;
            gridOptions.dataheight = gridOptions.dataheight || 300;
            gridOptions.url = url;
            gridOptions.mtype = mtype;
            gridOptions.closeAfterEdit = gridOptions.closeAfterEdit || true;
            gridOptions.reloadAfterSubmit = gridOptions.reloadAfterSubmit || false;
            gridOptions.afterComplete = micaCommon.grid.afterCompleteFnc(afterCompleteFnc);
            gridOptions.beforeSubmit = micaCommon.grid.beforeSubmitFnc(beforeSubmitFnc);
            gridOptions.serializeEditData = micaCommon.grid.serializeEditDataFnc(serializeEditDataFnc);
            gridOptions.afterShowForm = function ($form) {
                $form.css("width", "");
            };
            if (rowId != null) {
                grid.jqGrid("editGridRow", rowId, gridOptions);
            }
            else {
                var selMsg = options.selMsg || "Please Select Row";
                micaCommon.messageBox({ title: "Edit Form", type: "warning", width: "400", height: "110", html: selMsg });
                //alert(selMsg);
            }

            //grid.jqGrid("editGridRow", rowId, gridOtions);
        },
        delForm: function (grid, url, mtype, options) {
            micaCommon.grid.ajaxSetup();
            url = url || "clientArray";
            options = options || {};
            var afterCompleteFnc = options.afterComplete;
            var beforeSubmitFnc = options.beforeSubmit;
            var serializeDelDataFnc = options.serializeDelData;
            var urlRowIdFlag = options.urlRowIdFlag || false;
            grid = typeof grid == "string" ? $(grid) : grid;
            grid = grid.is("div") ? grid.find("#table_" + grid.attr("id")) : grid;
            var rowId = grid.jqGrid('getGridParam', "selrow");
            url = urlRowIdFlag ? url + rowId : url;

            var delChildMsg = options.delChildMsg || "하위 노드값도 지워집니다. 지우시겠습니까?";
            micaCommon.treeGrid.delMsg = options.delMsg || $("td.delmsg").html();

            beforeShowForm = function ($form) {
                var grid = $(this);
                var selId = micaCommon.grid.get(grid, "getGridParam", "selrow");
                var sel = micaCommon.grid.get(grid, "getLocalRow", selId);
                var child = micaCommon.grid.get(grid, "getNodeChildren", sel);
                if (child.length > 0) {
                    //$("td.delmsg", $form[0]).html("Do you really want delete the row with <b>id=" +
                    //     $("#list").jqGrid('getGridParam', 'selrow') + "</b>?");
                    $("td.delmsg", $form[0]).html(delChildMsg);
                    //$.jgrid.del.msg = "정말 삭제하실거에요?";
                } else {
                    if (micaCommon.treeGrid.delMsg != "") {
                        $("td.delmsg", $form[0]).html(micaCommon.treeGrid.delMsg);
                    }
                }
            };

            var rowData = grid.jqGrid('getRowData', rowId);

            var gridOptions = options;
            gridOptions.delData = rowData,
            gridOptions.width = "100%", gridOptions.height = "100%";
            gridOptions.url = url;
            gridOptions.mtype = mtype;
            gridOptions.afterComplete = micaCommon.grid.afterCompleteFnc(afterCompleteFnc);
            gridOptions.beforeSubmit = micaCommon.grid.beforeSubmitFnc(beforeSubmitFnc);
            gridOptions.serializeDelData = micaCommon.grid.serializeDelDataFnc(serializeDelDataFnc);
            gridOptions.beforeShowForm = beforeShowForm;

            if (rowId != null) {
                grid.jqGrid("delGridRow", rowId, gridOptions);
                return rowId;
            }
            else {
                var selMsg = options.selMsg || "Please Select Row";
                micaCommon.messageBox({ title: "Delete Form", type: "warning", width: "400", height: "110", html: selMsg });
                //alert(selMsg);
            }

            // grid.jqGrid("delGridRow", rowId, gridOptions);
            // return rowId;
        },
        set: function (grid, gridOptions, options, callBack) {
            callBack = callBack || {};
            callBack.before = this.treeSetUp(gridOptions.before, options, callBack);
            micaCommon.grid.set(grid, gridOptions, options, callBack);
        },
        treeSetUp: function (gridOptions, options, callBack) {
            callBack = callBack || {};
            return micaCommon.fncS.fncMerge(callBack.before, this.afterSetup);

        },
        afterSetup: function (data, gridOptions, options) {
            //var treeReader = gridOptions.treeReader;
            micaCommon.treeGrid.columnRowCopy([{
                before: gridOptions.treeReader.level_field,
                after: gridOptions.treeReader.level_field + "tmp"
            },
            {
                before: gridOptions.treeReader.parent_id_field,
                after: gridOptions.treeReader.parent_id_field + "tmp"
            }],
            gridOptions);

            gridOptions.treeReader.originLevel_field = gridOptions.treeReader.level_field + "_origin";
            gridOptions.treeReader.originParent_id_field = gridOptions.treeReader.parent_id_field + "_origin"; // _origin : 넣은 이유는 그냥 넣으면 컬럼이 데이터를 안보내준다. 이유는 모르겠다.
            gridOptions.treeReader.level_field = gridOptions.treeReader.level_field + "tmp";
            gridOptions.treeReader.parent_id_field = gridOptions.treeReader.parent_id_field + "tmp";

            //jsonReader= {
            //        id: 'PARENTFACILITYID'
            //},
            //treeReader= {
            //    "level_field": "FACILITYLEVEL",
            //    "parent_id_field": "PARENTFACILITYID",
            //    "expanded_field": "expanded",
            //    "loaded": "loaded",
            //    "icon_field": "icon"
            //}
        },
        columnRowCopy: function (column, gridOptions) {
            // column : [{befroe: "변경전컬럼명", after:"변경후컬럼명"}], data : rows데이터
            for (var i = 0; i < gridOptions.data.length; i++) {
                $.each(column, function (j, v) {
                    gridOptions.data[i][v.after] = gridOptions.data[i][v.before];
                });
                gridOptions.data[i]["loaded"] = true;
                gridOptions.data[i]["id"] = gridOptions.data[i][gridOptions.jsonReader.id];
            }
            gridOptions.jsonReader.originId = gridOptions.jsonReader.id;
            gridOptions.jsonReader.id = "id";
            return gridOptions;
        }
    },
    chart: {
        list: {},
        set: function (el, elOptions, options, callBack) {
            // gridOptions : chart options
            // options : url, mtype, data(postData), rowsName(resultDataName) , 
            // callBack : before(function, [function]) , after(function, [function]) -> param = data, gridOptions, options

            el = typeof el == "string" ? $(el) : el;
            elOptions = elOptions || {};
            options = options || {};
            callBack = callBack || {};

            if (options.url != null) {
                var url = options.url, mtype = options.mtype || "post", data = options.data;
                if (mtype == "get") {
                    $.get(url).done(function (data) {
                        if (typeof (data) == "string") {
                            data = JSON.parse(data);
                        }
                        if (elOptions.type == "gauge") {
                            elOptions = micaCommon.chart.bandSet(data, elOptions, options);
                        }
                        else {
                            elOptions = micaCommon.chart.dataProviderSet(data, elOptions, options);
                        }
                        var errorFlag = micaCommon.chart.elOptionsSet(data, elOptions, options);
                        if (errorFlag) { return; }
                        micaCommon.fncS.callBackExec(callBack.before, data, elOptions, options);
                        micaCommon.chart.list[el.attr("id")] = AmCharts.makeChart(el[0], elOptions);
                        micaCommon.fncS.callBackExec(callBack.after, data, elOptions, options);
                        //$(".jqx-splitter").trigger("resize");
                        if (options.listener) { micaCommon.chart.addListener(el, options.listener); }
                    });
                } else {
                    ajaxService(data, url, null, mtype).done(function (data) {
                        //options, gridOptions;
                        if (typeof (data) == "string") {
                            data = JSON.parse(data);
                        } if (elOptions.type == "gauge") {
                            elOptions = micaCommon.chart.bandSet(data, elOptions, options);
                        }
                        else {
                            elOptions = micaCommon.chart.dataProviderSet(data, elOptions, options);
                        }
                        var errorFlag = micaCommon.chart.elOptionsSet(data, elOptions, options);
                        if (errorFlag) { return; }
                        micaCommon.fncS.callBackExec(callBack.before, data, elOptions, options);
                        micaCommon.chart.list[el.attr("id")] = AmCharts.makeChart(el[0], elOptions);
                        micaCommon.fncS.callBackExec(callBack.after, data, elOptions, options);
                        //$(".jqx-splitter").trigger("resize");
                        if (options.listener) { micaCommon.chart.addListener(el, options.listener); }
                    });
                }
            } else {
                //this.setGrid(grid, gridOptions);
                elOptions = elOptions || {
                    //dataProvider: [{ country: "USA", visits: 3025, color: "#FF0F00" }, { "country": "China", "visits": 1882, "color": "#FF6600" }, { "country": "Japan", "visits": 1809, "color": "#FF9E01" }, { "country": "Germany", "visits": 1322, "color": "#FCD202" }, { "country": "UK", "visits": 1122, "color": "#F8FF01" }, { "country": "France", "visits": 1114, "color": "#B0DE09" }, { "country": "India", "visits": 984, "color": "#04D215" }, { "country": "Spain", "visits": 711, "color": "#0D8ECF" }, { "country": "Netherlands", "visits": 665, "color": "#0D52D1" }, { "country": "Russia", "visits": 580, "color": "#2A0CD0" }, { "country": "South Korea", "visits": 443, "color": "#8A0CCF" }, { "country": "Canada", "visits": 441, "color": "#CD0D74" }],
                    dataProvider: elOptions.dataProvider || [{ country: "USA", visits: 3025, color: "#FF0F00" }, { "country": "China", "visits": 1882, "color": "#FF6600" }, { "country": "Japan", "visits": 1809, "color": "#FF9E01" }, { "country": "Germany", "visits": 1322, "color": "#FCD202" }, { "country": "UK", "visits": 1122, "color": "#F8FF01" }, { "country": "France", "visits": 1114, "color": "#B0DE09" }, { "country": "India", "visits": 984, "color": "#04D215" }, { "country": "Spain", "visits": 711, "color": "#0D8ECF" }, { "country": "Netherlands", "visits": 665, "color": "#0D52D1" }, { "country": "Russia", "visits": 580, "color": "#2A0CD0" }, { "country": "South Korea", "visits": 443, "color": "#8A0CCF" }, { "country": "Canada", "visits": 441, "color": "#CD0D74" }],
                    type: elOptions.type || "serial",
                    categoryField: elOptions.categoryField || "country",
                    graphs: elOptions.categoryField || [{
                        //balloonText: "<b>[[category]]: [[value]]</b>",
                        fillAlphas: 1, type: "column", valueField: "visits"
                    }]
                    //valueAxes: [{ axisAlpha: 0, position: "left", title: "value" }],
                    //startDuration: 1,
                    //categoryAxis: { gridPosition: "start", labelRotation: 45 }
                };
                if (elOptions.type == "pie") {
                    elOptions.valueField = elOptions.valueField || null;
                }
                // http://112.216.110.174:8006/api/WipInventory/grid

                var data = elOptions.data || {};
                var errorFlag = micaCommon.chart.elOptionsSet(data, elOptions, options);
                if (errorFlag) { return; }
                micaCommon.fncS.callBackExec(callBack.before, data, elOptions, options);
                micaCommon.chart.list[el.attr("id")] = AmCharts.makeChart(el[0], elOptions);
                micaCommon.fncS.callBackExec(callBack.after, data, elOptions, options);
                $(window).trigger("resize");
                if (options.listener) { micaCommon.chart.addListener(el, options.listener); }
            }
        },
        get: (
            function (args) {
                var f = function (el) {
                    el = typeof el == "string" ? $(el) : el;
                    var result = this.list[el.attr("id")];
                    if (result == null) {
                        var errorStr = "Chart List : ";
                        $.each(this.list, function (i, chart) {
                            errorStr += "#" + i + ", ";
                        });
                        errorStr = errorStr.length < 14 ? errorStr + "Null" : errorStr.substr(0, errorStr.length - 2);
                        console.error(errorStr);
                    }
                    return result;
                };

                for (i in args) {
                    f[i] = args[i];
                }
                return f;
            }
            ({
                all: function (el) {
                    el = typeof el == "string" ? $(el) : el;
                    return micaCommon.chart.get(el).dataProvider;
                    //gridToExcel(el.jqGrid("getGridParam"));
                }
            })
        ),
        addListener: function (el, listener) {
            el = typeof el == "string" ? $(el) : el;
            var chart = micaCommon.chart.get(el);
            $.each(listener, function (name, value) {
                chart.addListener(name, value);
            });
        },
        dataProviderSet: function (data, elOptions, options) {
            var rowsName = options.rowsName;
            if (rowsName == null) {
                elOptions.dataProvider = data;
            } else {
                elOptions.dataProvider = micaCommon.fncS.hierarchyReturn(data, options.rowsName);
            }
            return elOptions;
        },
        bandSet: function (data, elOptions, options) {
            var rowsName = options.rowsName;
            if (rowsName == null) {
                //elOptions.dataProvider = data;
            } else {
                data = micaCommon.fncS.hierarchyReturn(data, options.rowsName);
            }
            var j = 0;
            for (var i = 0; i < elOptions.axes[0].bands.length; i++) {
                if (i % 2 == 0) {
                    elOptions.axes[0].bands[i].startValue = elOptions.axes[0].startValue;
                    elOptions.axes[0].bands[i].endValue = elOptions.axes[0].endValue;
                } else {
                    elOptions.axes[0].bands[i].startValue = data[j].startValue;
                    elOptions.axes[0].bands[i].endValue = data[j].endValue;
                    j++;
                }
            }
            return elOptions;
        },
        elOptionsSet: function (data, elOptions, options) {
            var errorStr = "Chart elOptions Null Error\n";
            var errorFlag = false;
            elOptions.type = elOptions.type || "serial";
            if (elOptions.type == "serial") {
                if (elOptions.categoryField == null) {
                    errorStr += 'categoryField Ex: "Text"\n';
                    errorFlag = true;
                }
                if (elOptions.graphs == null) {
                    errorStr += 'graphs(array) Ex: [{fillAlphas:1, type:"column", valueField: "value"}]';
                    errorFlag = true;
                }
            } else if (elOptions.type == "pie") {
                if ($("#pieChartScript").length == 0) {
                    jQuery("head").append("<script src='/micaweb/Content/amcharts/pie.js' id='pieChartScript'>");
                }
                if (elOptions.valueField == null) {
                    errorStr += 'valueField Ex: "value"\n';
                    errorFlag = true;
                }
            } else if (elOptions.type == "xy") {
                if ($("#xyChartScript").length == 0) {
                    jQuery("head").append("<script src='/micaweb/Content/amcharts/xy.js' id='xyChartScript'>");
                }
                if (elOptions.graphs == null) {
                    errorStr += 'graphs(array) Ex: [{fillAlphas:1, type:"column", valueField: "value"}]';
                    errorFlag = true;
                }
            } else if (elOptions.type == "funnel") {
                if ($("#funnelChartScript").length == 0) {
                    jQuery("head").append("<script src='/micaweb/Content/amcharts/funnel.js' id='funnelChartScript'>");
                }
                if (elOptions.valueField == null) {
                    errorStr += 'valueField Ex: "value"\n';
                    errorFlag = true;
                }
            } else if (elOptions.type == "radar") {
                if ($("#radarChartScript").length == 0) {
                    jQuery("head").append("<script src='/micaweb/Content/amcharts/radar.js' id='radarChartScript'>");
                }
                if (elOptions.valueField == null) {
                    errorStr += 'graphs(array) Ex: [{fillAlphas:1, type:"column", valueField: "value"}]';
                    errorFlag = true;
                }
            } else if (elOptions.type == "gantt") {
                if ($("#ganttChartScript").length == 0) {
                    jQuery("head").append("<script src='/micaweb/Content/amcharts/gantt.js' id='ganttChartScript'>");
                }
                if (elOptions.categoryField == null) {
                    errorStr += 'categoryField Ex: "Text"\n';
                    errorFlag = true;
                }
                if (elOptions.segmentsField == null) {
                    errorStr += 'segmentsField Ex: "segment"\n';
                    errorFlag = true;
                }
            } else if (elOptions.type == "gauge") {
                if ($("#gaugeChartScript").length == 0) {
                    jQuery("head").append("<script src='/micaweb/Content/amcharts/gauge.js' id='gaugeChartScript'>");
                }
            }


            if (errorFlag) { console.error(errorStr); }

            //console.error('Chart elOptions Null Error\ncategoryField Ex: bottom Text\ngraphs(array) Ex: [{fillAlphas:1, type:"column", valueField: "value"}]');

            return errorFlag;
        }
    },
    comboBox: {
        list: {},
        reserveDropDownCount: 5,
        set: function (el, comboOptions, options, callBack) {
            //options : url, textName, valueName, hierarchy
            //options : local[] = [{text:"", value:""}]
            //options : readonly (true) // autocomplete 기능.
            //callBack : before(function), after(function)
            el = typeof el == "string" ? $(el) : el;
            
        	if (el.length < 1 ) return; // 동적콤보 없을 때 제외 처리
            el.removeClass("w-select");
            comboOptions = comboOptions || {};
            options = options || {};
            callBack = callBack || {};
            micaCommon.fncS.initialized(el, false);
            var checkedIndex;
            if (typeof comboOptions.checkedIndex != "undefined" && comboOptions.checkedIndex != null) {
                checkedIndex = comboOptions.checkedIndex;
                // comboOptions에 checkedIndex항목이 존재시 오류발생 by.ohky
                delete comboOptions.checkedIndex;
            }
            var reserveDropDownHeightFlag = false;
            if (typeof comboOptions.reserveDropDownHeight == "undefined" || comboOptions.reserveDropDownHeight) {
                reserveDropDownHeightFlag = true;
                delete comboOptions.dropDownHeight;
                delete comboOptions.autoDropDownHeight;
                delete comboOptions.reserveDropDownHeight;
            }
            // option 위치 변경 by.joon
            el.jqxComboBox(comboOptions);
            var readonly = options.readonly == null ? true : options.readonly;
            $("#" + el.attr("name")).find("input").attr("readonly", readonly);
            var data = options.data || {};
            this.clear(el);
            if (options.allText) {
                micaCommon.comboBox.add(el, [{ label: options.allText, value: "" }], { textName: "label", valueName: "value" });
            }
            /*
            if (typeof comboOptions.checkboxes != "undefined" && comboOptions.checkboxes) {
                // 중복실행 방지용 변수설정
                micaCommon.comboBox.handleCheckChange[el.attr("id")] = true;

                el.on('checkChange', function (event) {
                    // 실행중이면 return
                    if (!micaCommon.comboBox.handleCheckChange[event.owner.element.id]) return;

                    micaCommon.comboBox.handleCheckChange[event.owner.element.id] = false;

                    if (options.allText) {
                        if (event.args.label == options.allText && event.args.value == "" && event.args.item.index == 0) {
                            if (event.args.item.checked) {
                                el.jqxComboBox('uncheckAll');
                                el.jqxComboBox('checkIndex', 0);
                            } else {
                                el.jqxComboBox('uncheckAll');
                            }
                        } else {
                            if ((el.jqxComboBox('getCheckedItems').length + 1) == el.jqxComboBox('getItems').length) {
                                el.jqxComboBox('uncheckAll');
                                el.jqxComboBox('checkIndex', 0);
                            } else if (el.jqxComboBox('getCheckedItems').length > 1) {
                                el.jqxComboBox('uncheckIndex', 0);
                            }
                        }
                    }

                    micaCommon.comboBox.handleCheckChange[event.owner.element.id] = true;

                    // checkBox 컨트롤 후 "change" 이벤트 발생시킴
                    el.trigger("change");
                });
            }
            */
            if (options.url) {

                var mtype = options.mtype || "POST";
                if (mtype == "get") {
                    ajaxService.setAuth();
                    $.get(options.url, data).done(function (data) {
                        if (typeof (data) == "string") {
                            data = JSON.parse(data);
                        }
                        micaCommon.fncS.callBackExec(callBack.before, data, comboOptions, options);
                        var dataObj = micaCommon.fncS.hierarchyReturn(data, options.rowsName);
                        micaCommon.comboBox.list[el.attr("id")] = micaCommon.fncS.keyValueSet({ data: dataObj, key: options.valueName });
                        micaCommon.comboBox.add(el, dataObj, options);
                        if (comboOptions.searchMode == "none") {
                        }
                        micaCommon.comboBox.selectedIndex(el, comboOptions);
                        if (typeof comboOptions.checkboxes != "undefined" && comboOptions.checkboxes) {
                            micaCommon.comboBox.checkedIndex(el, checkedIndex);
                        }
                        micaCommon.fncS.callBackExec(callBack.after, data, comboOptions, options);
                        micaCommon.comboBox.allCheckFnc(el, comboOptions, options);
                        if (reserveDropDownHeightFlag) {
                            micaCommon.comboBox.reserveDropDownHeight(el);
                        }
                        micaCommon.fncS.initialized(el, true);
                    });
                } else {
                    ajaxService(data, options.url, null, mtype).done(function (data) {
                        micaCommon.fncS.callBackExec(callBack.before, data, comboOptions, options);
                        var dataObj = micaCommon.fncS.hierarchyReturn(data, options.rowsName);
                        if (dataObj == null) {
                            if (callBack.exception) {
                                micaCommon.fncS.callBackExec(callBack.exception, data, comboOptions, options);
                            } else {
                                micaCommon.notication.open("warning", "No Data");
                            }
                            return;
                        }
                        micaCommon.comboBox.list[el.attr("id")] = micaCommon.fncS.keyValueSet({ data: dataObj, key: options.valueName });
                        micaCommon.comboBox.add(el, dataObj, options);
                        micaCommon.comboBox.selectedIndex(el, comboOptions);
                        if (typeof comboOptions.checkboxes != "undefined" && comboOptions.checkboxes) {
                            micaCommon.comboBox.checkedIndex(el, checkedIndex);
                        }
                        micaCommon.fncS.callBackExec(callBack.after, data, comboOptions, options);
                        micaCommon.comboBox.allCheckFnc(el, comboOptions, options);
                        if (reserveDropDownHeightFlag) {
                            micaCommon.comboBox.reserveDropDownHeight(el);
                        }
                        micaCommon.fncS.initialized(el, true);
                    });
                }
                //(data, url, successFn, method, errorFn, options)
            } else {

                var dataObj = options.local;
                data = options.local;
                if (dataObj != null) {
                    micaCommon.comboBox.list[el.attr("id")] = micaCommon.fncS.keyValueSet({ data: dataObj, key: options.valueName });
                    micaCommon.fncS.callBackExec(callBack.before, data, comboOptions, options);
                    micaCommon.comboBox.add(el, dataObj, options);
                    micaCommon.comboBox.selectedIndex(el, comboOptions);
                    if (typeof comboOptions.checkboxes != "undefined" && comboOptions.checkboxes) {
                        micaCommon.comboBox.checkedIndex(el, checkedIndex);
                    }
                    micaCommon.fncS.callBackExec(callBack.after, data, comboOptions, options);
                    micaCommon.comboBox.allCheckFnc(el, comboOptions, options);
                    if (reserveDropDownHeightFlag) {
                        micaCommon.comboBox.reserveDropDownHeight(el);
                    }
                    micaCommon.fncS.initialized(el, true);
                }
            }
            if (el.jqxComboBox("dropDownHeight") < 1) { el.jqxComboBox({ dropDownHeight: 250 }); };
            //$("#" + el.attr("name")).find("input").attr("readonly", true);
            el.jqxComboBox(comboOptions);
            if (typeof comboOptions.checkboxes != "undefined" && comboOptions.checkboxes) {
                micaCommon.comboBox.checkedIndex(el, checkedIndex);
            }
            el.parent().find("#" + (el.attr("id")).replace("_jqxComboBox", "").replace(/_/g, "-")).find("input").attr("readonly", readonly);
        },
        add: function (el, obj, options) {
            // obj : [{label, value}], 
            // options : textName, valueName
            obj = obj || {};
            options = options || {};
            el = typeof el == "string" ? $(el) : el;
            if (el.jqxComboBox("dropDownHeight") < 1) { el.jqxComboBox({ dropDownHeight: 250 }); };
            var textName = options.textName || "label";
            var valueName = options.valueName || "value";
            //$.each(obj, function (i, data) {
            //    el.jqxComboBox("addItem", { label: data[textName], value: data[valueName] });
            //});
            var items = [];
            items = JSON.parse(JSON.stringify(el.jqxComboBox("source")));
            $.each(obj, function (i, data) {
                items.push({ label: data[textName], value: data[valueName] });
            });
            el.jqxComboBox("source", items);
        },
        clear: function (el) {
            el = typeof el == "string" ? $(el) : el;
            //var num = el.jqxComboBox("getItems").length;
            //for (var i = 0; i < num; i++) {
            //    el.jqxComboBox("removeAt", 0);
            //}
            el.jqxComboBox("clear");
            el.jqxComboBox("source", []);
        },
        value: function (el) {
            el = typeof el == "string" ? $(el) : el;
            var values = el.jqxComboBox("getCheckedItems") || el.jqxComboBox("getSelectedItems");
            var result = [];
            if (values.length < 1) {
                var val = $(el.find("input")[0]).attr("value");
                if (val != "") {
                    values = [el.jqxComboBox("getSelectedItem")];
                }
            }

            $.each(values, function (i, value) {
                result.push({ label: value.label, value: value.value });
            });
            //value = $(el.find("input")[0]).attr("value")
            return result;
        },
        checkItem: function (el, obj) {
            //obj: array
            el = typeof el == "string" ? $(el) : el;
            $.each(obj, function (i, v) {
                el.jqxComboBox("checkItem", v);
            });
        },
        selectItem: function (el, obj) {
            //obj: array
            el = typeof el == "string" ? $(el) : el;
            $.each(obj, function (i, v) {
                el.jqxComboBox("selectItem", v);
            });
        },
        selectedIndex: function (el, indexObj) {
            el = $(el);
            var objType = typeof indexObj;

            switch (objType) {
                case "number":
                    el.jqxComboBox("selectIndex", indexObj);
                    break;
                case "object":
                    if (indexObj.selectedIndex != null) {
                        if (Array.isArray(indexObj.selectedIndex)) {
                            $.each(indexObj.selectedIndex, function (idx, item) {
                                el.jqxComboBox("selectIndex", indexObj.selectedIndex[idx]);
                            });
                        } else {
                            el.jqxComboBox("selectIndex", indexObj.selectedIndex);
                        }
                    } else if (Array.isArray(indexObj)) {
                        $.each(indexObj, function (idx, item) {
                            el.jqxComboBox("selectIndex", indexObj[idx]);
                        });
                    }
                    break;
            }
        },
        checkedIndex: function (el, indexObj) {
            el = $(el);
            var objType = typeof indexObj;

            switch (objType) {
                case "number":
                    el.jqxComboBox("checkIndex", indexObj);
                    break;
                case "string":
                    if (indexObj.toUpperCase() == "ALL") {
                        el.jqxComboBox("checkAll");
                    }
                    break;
                case "object":
                    if (indexObj.checkedIndex != null) {
                        if (typeof indexObj.checkedIndex == "number") {
                            el.jqxComboBox("checkIndex", indexObj.checkedIndex);
                        } else if (typeof indexObj.checkedIndex == "string" && indexObj.checkedIndex.toUpperCase() == "ALL") {
                            el.jqxComboBox("checkAll");
                        } else if (Array.isArray(indexObj.checkedIndex)) {
                            $.each(indexObj.checkedIndex, function (idx, item) {
                                el.jqxComboBox("checkIndex", indexObj.checkedIndex[idx]);
                            });
                        }
                    } else if (Array.isArray(indexObj)) {
                        $.each(indexObj, function (idx, item) {
                            el.jqxComboBox("checkIndex", indexObj[idx]);
                        });
                    }
                    break;
            }
        },
        reserveDropDownHeight: function (el) {
            el = $(el);
            if (el.jqxComboBox("getItems").length >= micaCommon.comboBox.reserveDropDownCount) {
                el.jqxComboBox({ autoDropDownHeight: false, dropDownHeight: (micaCommon.comboBox.reserveDropDownCount * 31) });
            } else {
                el.jqxComboBox({ autoDropDownHeight: true });
            }
        },
        allCheckFnc: function (el, comboOptions, options) {
            el.unbind("checkChange");
            var allText = options.allText;
            if (allText && comboOptions.checkboxes) {
                var id = "#" + el.attr("id").replace(/_jqxComboBox/gi, "");
                $(id).on('checkChange', function (event) {
                    if (event.args) {
                        var item = event.args.item;
                        var value = item.value;
                        var label = item.label;
                        var checked = item.checked;
                        if (allText == label) {
                            console.log("==");
                        }
                        var checkList = $(this).jqxComboBox('getCheckedItems');
                        var list = $(this).jqxComboBox("getItems");
                        //var checkedItems = $("#jqxComboBox").jqxComboBox('getCheckedItems');
                    }
                });
            }
        },
        initialized: function (el) {
            return micaCommon.fncS.initialized(el);
        }
    },
    comboGridBox: {
        set: function (el, comboOptions, options, callBack) {
            // comboOptions : renderer(index, label, value, row, options)
            // options : style{} -> css 속성
            el = typeof el == "string" ? $(el) : el;
            options = options || {};
            comboOptions = comboOptions || {};
            callBack = callBack || {};
            var renderer = comboOptions.renderer || function (index, label, value, row, options) {
                var gridStyle = options.gridStyle || {};
                var gridClass = options.gridClass || "";
                var div = $("<div>");
                var table = $('<table style="width:100%">');
                var tr = $('<tr style="height:inherit; width:inherit; background-color:inherit;float:left;">').css(gridStyle).addClass(gridClass);
                var td = "<td>#{data}</td>";
                if (row) {
                    $.each(row, function (i, v) {
                        var resultTd = td;
                        if (i != options.valueName && i != value && i != label) {
                            resultTd = resultTd.replace(/#{data}/gi, v);
                            tr.append(resultTd);
                        }
                    });
                } else {
                    var resultTd = td;
                    resultTd = resultTd.replace(/#{data}/gi, label);
                    tr.append(resultTd);
                }
                table.append(tr);
                div.append(table);
                return div.html();
            };

            comboOptions.renderer = function (index, label, value) {
                var rows = micaCommon.comboBox.list[el.attr("id")];
                var row = rows == null ? { text: label } : row = rows[value];
                return renderer(index, label, value, row, options);
            };

            micaCommon.comboBox.set(el, comboOptions, options, callBack);
        },
        value: function (el) {
            micaCommon.comboBox.value(el);
        },
    },
    autoComplete: (function (args) {
        var f = function (el, options) {
            el = micaCommon.fncS.elObj(el);
            el.autocomplete(options);
            if (options.height) {
                $(".ui-autocomplete").css({ height: options.height, "overflow-y": "scroll", "overflow-x": "hidden" });
            }
        };

        for (i in args) {
            f[i] = args[i];
        }
        return f;
    }
        ({
            menu: function (el, options) {
                // options :
                //          source -> data [{},{}] 
                //          hrefName  -> source의 href키이름
                micaCommon.autoComplete.menuStyle();
                options = options || {};
                var hrefName = options.hrefName;
                var select = function (e, data) {
                    location.href = data.item[hrefName] || data.item.url || data.item.href;
                };
                options.select = options.select || select;
                micaCommon.autoComplete(el, options);
            },
            menuStyleFlag: false,
            menuStyle: function () {
                if (micaCommon.autoComplete.menuStyleFlag) { return; }
                micaCommon.autoComplete.menuStyleFlag = true;
                var style = $("<style>");
                style.append(".ui-widget-content {                                                 " +
                "    border: 1px solid #aaaaaa;                                                     " +
                "background: #ffffff; " +
                "color: #222222;                                                                    " +
                "}                                                                                  " +
                "    .ui-widget {                  " +
                //"    font-family: Verdana,Arial,sans-serif; " +
                //"font-size: 1.1em;                          " +
                "}                                          " +
                ".ui-menu {                                 " +
                "    list-style: none;                      " +
                "    padding: 0;                            " +
                "    margin: 0;                             " +
                "    display: block;                        " +
                "    outline: none;                         " +
                "}                                          " +
                ".ui-autocomplete {                         " +
                "    position: absolute;                    " +
                "    top: 0;                                " +
                "    left: 0;                               " +
                "    cursor: default;                       " +
                "}                                          " +
                ".ui-front {                                " +
                "    z-index: 100;                          " +
                "}");
                style.append(
                ".ui-menu .ui-menu-item {                                                                                      "
                 + "    position: relative;                                                                                       "
                 + "margin: 0;                                                                                                    "
                 + "padding: 3px 1em 3px .4em;                                                                                    "
                 + "cursor: pointer;                                                                                              "
                 + "min-height: 0;                                                                                                "
                 + "support: IE7;                                                                                                 "
                 + "support: IE10, see #8844;                                                                                     "
                 + "}                                                                                                             "
                 + "user agent stylesheetli {                                                                                     "
                 + "    display: list-item;                                                                                       "
                 + "    text-align: -webkit-match-parent;                                                                         "
                 + "}                                                                                                             "
                 + "Inherited from ul#ui-id-1.ui-autocomplete.ui-front.ui-menu.ui-widget.ui-widget-content                        "
                 + ".ui-widget-content {                                                                                          "
                 + "    border: 1px solid #aaaaaa;                                                                                "
                 + '    /* background: #ffffff url("images/ui-bg_flat_75_ffffff_40x100.png") 50% 50% repeat-x; */                 '
                 + "    color: #222222;                                                                                           "
                 + "}                                                                                                             "
                 + ".ui-autocomplete.ui-front.ui-menu.ui-widget {                                                                                                  "
                 + "     z-index:999999;                                                                        "
                 + "}                                                                                                             "
                 //+".ui-widget {                                                                                                  "
                 //+"    font-family: Verdana,Arial,sans-serif;                                                                    "
                 //+"    font-size: 1.1em;  z-index:999999;                                                                        "
                 //+"}                                                                                                             "
                 + ".ui-menu {                                                                                                    "
                 + "    list-style: none;                                                                                         "
                 + "    padding: 0;                                                                                               "
                 + "    margin: 0;                                                                                                "
                 + "    display: block;                                                                                           "
                 + "    outline: none;                                                                                            "
                 + "}"
                );

                style.append(".ui-widget-content a {                                   " +
                "    color: #222;                                                      " +
                "}                                                                     " +
                ".ui-corner-all, .ui-corner-bottom, .ui-corner-right, .ui-corner-br {  " +
                "    border-bottom-right-radius: 4px;                                  " +
                "}                                                                     " +
                ".ui-corner-all, .ui-corner-bottom, .ui-corner-left, .ui-corner-bl {   " +
                "    border-bottom-left-radius: 4px;                                   " +
                "}                                                                     " +
                ".ui-corner-all, .ui-corner-top, .ui-corner-right, .ui-corner-tr {     " +
                "    border-top-right-radius: 4px;                                     " +
                "}                                                                     " +
                ".ui-corner-all, .ui-corner-top, .ui-corner-left, .ui-corner-tl {      " +
                "    border-top-left-radius: 4px;                                      " +
                "}");

                style.append(
                    //".ui-state-hover, .ui-widget-content .ui-state-hover, .ui-widget-header .ui-state-hover, .ui-state-focus, .ui-widget-content .ui-state-focus, .ui-widget-header .ui-state-focus {" +
                    ".ui-widget-content .ui-state-focus {" +
                "    border: 1px solid #999999;                                                                                                                                                                " +
                'background: #dadada 50% 50% repeat-x;                                                                                                           ' +
                "font-weight: normal;                                                                                                                                                                          " +
                "color: #212121;                                                                                                                                                                               " +
                "}                                                        "
                //".ui-menu .ui-state-focus, .ui-menu .ui-state-active {    " +
                //"    margin: -1px;                                        " +
                //"}"
                );
                $("head").append(style);
            }
        })
    ),
    tree: {
        //Tree를 생성해주는 항목
        set: function (id, options, treeOptions, callBack) {
            id = typeof id == "string" ? $(id) : id;
            options = options || {};
            treeOptions = treeOptions || {};
            callBack = callBack || {};
            var record = [];
            if (options.url) {
                this.getData(options).done(function (data) {
                    //if (options.useColRowSet) {
                    //    data = openMes.colRowSet(data);
                    //}
                    record = micaCommon.tree.settingData(data, options.source);
                    treeOptions.source = record;
                    micaCommon.fncS.callBackExec(callBack.before, data, treeOptions, options);
                    micaCommon.tree.setTree(id, treeOptions);
                    micaCommon.fncS.callBackExec(callBack.after, data, treeOptions, options);
                });
            } else {
                record = micaCommon.tree.settingData(options.data, options.source);
                treeOptions.source = record;
                micaCommon.fncS.callBackExec(callBack.before, treeOptions.data, treeOptions, options);
                micaCommon.tree.setTree(id, treeOptions);
                micaCommon.fncS.callBackExec(callBack.after, treeOptions.data, treeOptions, options);
            }
        },

        //dataField를 맞춰주는 항목
        settingData: function (data, dataSource) {
            var source = {};
            var dataField = [];
            var name = {};
            for (key in dataSource) {
                dataField.push({ "name": dataSource[key] });
            }
            source.datatype = "json";
            source.datafields = dataField;
            source.id = dataSource.id;
            source.localdata = data;

            if (dataSource.html != null) {
                source.html = dataSource.html;
            }
            var dataAdapter = new $.jqx.dataAdapter(source);
            dataAdapter.dataBind();
            var records = dataAdapter.getRecordsHierarchy(dataSource.id, dataSource.parentid, dataSource.item,
                [
                    { name: dataSource.text, map: 'label' }, { name: dataSource.value, map: 'value' }, { name: dataSource.iconsize, map: 'iconsize' }
                ]);
            return records;
        },
        setTree: function (id, treeOptions) {
            $(id).jqxTree(treeOptions);
        },
        getData: function (options) {
            var url = options.url;
            var mtype = options.mtype || "get";
            var option = {};
            option.async = false;
            var data = options.data || {};
            return ajaxService(data, url, null, mtype, null, option);
        },
        getSelectData: function (id, event) {
            var args = event.args;
            var item = $(id).jqxTree('getItem', args.element);
            return item;
        },
        getItem: function (el, item) {
            el = typeof el == "string" ? $(el) : el;
            return el.jqxTree('getItem', item);
        },
        addTree: function (id) {
            var selectedItem = $(id).jqxTree('selectedItem');
            if (selectedItem != null) {
                $(id).jqxTree('addTo', { label: 'newMenu' }, selectedItem.element, false);
                // update the tree.
                $(id).jqxTree('render');
                //$(id).jqxTree('selectedItem', )
            } else {
                $(id).jqxTree('addTo', { label: 'newMenu' }, null, false);
                // update the tree.
                $(id).jqxTree('render');
            }
        },
        delTree: function (id) {
            var selectedItem = $(id).jqxTree('selectedItem');
            if (selectedItem != null) {
                $(id).jqxTree('removeItem', selectedItem.element, false);
                $(id).jqxTree('render');
            }
            else {
                //alert("select the tree item");
                micaCommon.messageBox({ title: "Delete Tree", type: "warning", width: "400", height: "110", html: "Please Select Tree Item." });
                return false;
            }
        },
        num: 0,
        //2016.11.25 이서연 - icon options 추가
        add: function (id, options) {
            var options = options || {};
            //기본으로 입력될 정보
            var addOptions = { id: "newMenu" + this.num, label: 'newMenu' + this.num };
            if (options.icon != null) {
                addOptions.icon = options.icon;
            }
            if (options.iconSize != null) {
                addOptions.iconsize = options.iconSize;
            }
            // return newMenuID
            var selectedItem = $(id).jqxTree('selectedItem');
            if (selectedItem != null) {
                $(id).jqxTree('addTo', addOptions, selectedItem.element);
                // update the tree.
                $(id).jqxTree('render');
                ////$(id).jqxTree('selectedItem', )
            } else {
                $(id).jqxTree('addTo', addOptions, null, false);
                // update the tree.
                $(id).jqxTree('render');
            }
            $(id).jqxTree('selectItem', $("#" + "newMenu" + this.num)[0]);
            $(id).jqxTree('expandItem', $("#" + "newMenu" + this.num)[0]);
            return "newMenu" + this.num++;
        },
        del: function (id) {
            // return newMenuID
            var selectedItem = $(id).jqxTree('selectedItem');
            if (selectedItem != null) {
                $(id).jqxTree('removeItem', selectedItem.element, false);
                $(id).jqxTree('render');
            }
            else {
                //alert("select the tree item");
                micaCommon.messageBox({ title: "Delete Tree", type: "warning", width: "400", height: "110", html: "Please Select Tree Item." });
                return false;
            }
            return selectedItem.id;
        },
        collapseTree: function (id) {
            $(id).jqxTree('collapseAll');
        },
        expandTree: function (id) {
            $(id).jqxTree('expandAll');
        },
        filter: function (inputEl, treeEl, list, allItems) {
            // Sample code
            //$(document).on('keyup', "#txtFilter", function (e) {
            //    $("#treeEQPList li>div").removeClass('hightlight');
            //    if (e.target.value == "") return false;
            //    if (allItems == null) {
            //        allItems = $('#treeEQPList').jqxTree('getItems');
            //        $.each(allItems, function () {
            //            list.push(this.label);
            //        });
            //        micaCommon.tree.filter("#txtFilter", '#treeEQPList', list, allItems);
            //    }
            //    else {
            //        micaCommon.tree.filter("#txtFilter", '#treeEQPList', list, allItems);
            //    }
            //});
            $.map(list, function (value) {
                d = $(inputEl).val();
                var search = new RegExp(d, "gi");
                if (value.match(search)) {
                    $.each(allItems, function () {
                        if (this.label.toUpperCase() == value.toUpperCase()) {
                            $("#" + this.element.id + "> div").addClass('hightlight')
                            $(treeEl).jqxTree('expandItem', this);
                        };
                    });
                    return value;
                }
                return null;
            });
        }
    },
    capture: (
        function (args) {
            var f = function (el, options) {
                el = $(el);
                options = options || {};

                var type = options.type || "png";
                type = type.toLowerCase();
                var fnc = {};
                switch (type) {
                    case "png":
                    case "jpg":
                        fnc = micaCommon.capture.imageFnc;
                        break;
                    case "pdf":
                        fnc = micaCommon.capture.pdfFnc;
                        break;
                    default:
                        return;
                        break;
                }
                return micaCommon.capture.set(el, options, fnc);
            };

            for (i in args) {
                f[i] = args[i];
            }
            return f;
        }
        ({
            jsSet: function () {
                if (!this.jsSet.flag) {
                    this.jsSet.flag = true;
                    $("head").append('<script src="/micaweb/Content/theme/js/plugins/jspdf/jspdf.min.js"></script>');
                    $("head").append('<script src="/micaweb/Content/theme/js/plugins/html2canvas/html2canvas.js"></script>');

                    //$("head").append('<script src="/content/theme/js/plugins/html2canvas/html2canvasbeta1.js"></script>');
                    if (typeof b4w == "object") {
                        b4w.module["canvasImg"] = function (exports, require) {
                            var m_main = require("main");
                            /**
                             * Take a screenshot and download as screenshot.png image.
                             */
                            exports.shot = function (el, callBack) {
                                var cb = function (data) {
                                    var temp = $("<div>");
                                    temp.append(el.find("canvas").clone());
                                    var canvasHtml = temp.html();
                                    var img = $(canvasHtml.replace(/canvas/gi, "img"));
                                    img.addClass("captureTemp");
                                    var imgZ = img.css("z-index");
                                    //imgZ = imgZ == "" ? 1 : Number(imgZ)++;
                                    img.css("z-index", imgZ);
                                    img.attr("src", data);
                                    img.css("width", "100%");
                                    el.find("canvas").parent().prepend(img);
                                    if (callBack != null) {
                                        callBack();
                                    }
                                };
                                m_main.canvas_data_url(cb);
                            }
                        };
                    }
                }
            },
            set: function (el, options, fnc) {
                this.jsSet();
                el = $(el);
                options = options || {};
                $("#pdfObject").remove();

                var autoGridHeight = options.autoGridHeight || false;
                var background = options.background || "";
                if (el.find("img.captureTemp").length < 1 && el.find("canvas").length > 0 && typeof b4w != "undefined") {
                    b4w.require("canvasImg").shot(el, function () {
                        micaCommon.capture.set(el, options, fnc);
                    });

                } else {
                    return html2canvas([el[0]], {
                        autoGridHeight: autoGridHeight,
                        background: background,
                        onrendered: function (canvas) {
                            fnc(el, options, canvas);
                            $("img.captureTemp").remove();
                        }
                    });
                }
            },
            imageFnc: function (el, options, canvas) {
                el = $(el);
                options = options || {};
                var name = options.name || "download";
                var type = options.type || "png";
                if ($('#export-image-container').length == 0) {
                    var a = '<a id="export-image-container" download="#{name}.#{type}">';
                    $('body').append(a.replace(/#{name}/gi, name).replace(/#{type}/gi, type));
                }

                var img = canvas.toDataURL("image/png");
                //base64 = writeXmlZip(columnData, dataProvider);
                var ua = window.navigator.userAgent;
                var msie = ua.indexOf("MSIE ");
                msie = msie + ua.indexOf("Edge"); // IE나 Edge나 똑같다.
                if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer
                {
                    if (typeof Blob !== "undefined") {
                        var base64 = img.replace("data:image/png;base64,", "");
                        base64 = [base64];
                        var blob1 = b64toBlob(base64, "data:image/png");
                        window.navigator.msSaveBlob(blob1, name + "." + type);
                    } else {
                    }
                } else {
                    $('#export-image-container').attr('href', img);
                    $('#export-image-container')[0].click();
                    $('#export-image-container').remove();
                }

            },
            pdfFnc: function (el, options, canvas) {
                // options : orientation (landscape, portrait)
                // 'a3', 'a4' (Default),'a5' ,'letter' ,'legal'
                el = $(el);
                options = options || {};
                orientation = options.orientation || "landscape";
                var format = options.format || "a4";
                format = format.toLowerCase();
                var img = canvas.toDataURL("image/jpeg");
                var name = options.name || "download";
                var doc = new jsPDF(orientation, 'pt', format);
                var autoPrint = options.autoPrint;
                //var doc = new jsPDF('portrait', 'pt', 'a4');

                doc.setFontSize(40);
                //doc.text(10, 40, "한글Paranyan loves jsPDF");

                var pagerFormat = { a3: [842, 1190], a4: [595, 842], a5: [420, 595], letter: [612, 792], legal: [612, 1008] };
                //Letter		 612x792
                //LetterSmall	 612x792
                //Tabloid		 792x1224
                //Ledger		1224x792
                //Legal		 612x1008
                //Statement	 396x612
                //Executive	 540x720
                //A0               2384x3371
                //A1              1685x2384
                //A2		1190x1684
                //A3		 842x1190
                //A4		 595x842
                //A4Small		 595x842
                //A5		 420x595
                //B4		 729x1032
                //B5		 516x729
                //Envelope	 ???x???
                //Folio		 612x936
                //Quarto		 610x780
                //10x14		 720x1008
                //a4 = [595.28, 841.89];
                //var formatMax = [565, 812];
                var formatMax = pagerFormat[format];
                var left = 15; // 여백
                var top = 15;
                formatMax[0] -= left * 2;
                formatMax[1] -= top * 2;
                if (orientation == "landscape") {
                    formatMax.reverse();
                }
                var width = canvas.width;
                var height = canvas.height;
                var widthMax = [formatMax[0], height * (formatMax[0] / width)];
                var heightMax = [width * (formatMax[1] / height), formatMax[1]];
                var imageMax = [];
                if (widthMax[1] > formatMax[1]) {
                    imageMax = heightMax;
                } else {
                    imageMax = widthMax;
                }
                //imageData, format, x, y, w, h, alias, compression, rotation
                doc.addImage(img, 'PNG', left, top, Math.floor(imageMax[0]), Math.floor(imageMax[1]));
                if (autoPrint) {
                    doc.autoPrint();
                    var uri = doc.output("datauristring");
                    $("body").append('<div style="left:-9999999px; position:fixed"><object id="pdfObject"></object></div>');
                    $("#pdfObject").attr("data", uri);
                } else {
                    doc.save(name + '.pdf');
                }
            },
            png: function (el, options) {
                options = options || {};
                options.type = "png";
                this(el, options);
            },
            jpg: function (el, options) {
                options = options || {};
                options.type = "jpg";
                this(el, options);
            },
            pdf: function (el, options) {
                options = options || {};
                options.type = "pdf";
                this(el, options);
            }
        })
    ),
    download: (
        function (args) {
            var f = function (contentDom, type, width, height, plusWidth, plusHeight) {
                if (typeof contentDom == "string") {
                    contentDom = $(contentDom);
                }
                if (type == "xlsx") {
                    gridToExcel(contentDom.jqGrid("getGridParam"));
                }
                type = type ? type : "png";
                width = width ? width : contentDom.width();
                height = height ? height : contentDom.height() + 10;

                width = plusWidth ? width + plusWidth : width;
                height = plusHeight ? height + plusHeight : height;
                var bodyString = contentDom.html();
                var link = $("link");
                var htmlBody = "<!DOCTYPE html><html><head><meta charset='utf-8'>#{style}</head><body>#{body}</body></html>";
                var tagLink = "";
                var tag = '<link href="#{href}" rel="stylesheet" type="text/css">';
                for (var i = 0; i < link.length; i++) {
                    tagLink += tag.replace(/#{href}/gi, $("link")[i].href);
                }
                var style = tagLink;

                htmlBody = htmlBody.replace(/#{style}/gi, style);
                htmlBody = htmlBody.replace(/#{body}/gi, bodyString);

                // <a> 태그 안에 jqgrid a태그 삭제
                htmlBody = htmlBody.replace(/<a role="link" class="ui-jqgrid-titlebar-close HeaderButton ui-corner-all" title="Toggle Expand Collapse Grid" style="right: 0px;"><span class="ui-jqgrid-headlink ui-icon ui-icon-circle-triangle-n"><\/span><\/a>/gi);

                $("body").css("cursor", "progress");
                //e.preventDefault();
                var d = document.createElement("form");
                var url = "/MICAApi/PrintSubmitForm";
                d.setAttribute("method", "post");
                d.setAttribute("action", url);

                var h = document.createElement("input");
                h.setAttribute("type", "hidden");
                h.setAttribute("name", "type");
                h.setAttribute("value", type);
                d.appendChild(h);
                h = null;

                //var tg = "<div>success Print File</div>";
                h = document.createElement("input");
                h.setAttribute("type", "hidden");
                h.setAttribute("name", "html");
                h.setAttribute("value", encodeURIComponent(htmlBody));
                d.appendChild(h);
                h = null;

                h = document.createElement("input");
                h.setAttribute("type", "hidden");
                h.setAttribute("name", "height");
                //h.setAttribute("value", 4000);
                //h.setAttribute("value", $("#jqgrid").height() + 20);
                h.setAttribute("value", height);
                d.appendChild(h);
                h = null;

                h = document.createElement("input");
                h.setAttribute("type", "hidden");
                h.setAttribute("name", "width");
                //h.setAttribute("value", 1420);
                //h.setAttribute("value", $("body").width());
                h.setAttribute("value", width);

                d.appendChild(h);
                h = null;

                document.body.appendChild(d);
                d.submit();
                document.body.removeChild(d);
                $("body").css("cursor", "default");
            };

            for (i in args) {
                f[i] = args[i];
            }
            return f;
        }
        ({
            png: function (contentDom, width, height, plusWidth, plusHeight) {
                this(contentDom, "png", width, height, plusWidth, plusHeight);
            },
            jpg: function (contentDom, width, height, plusWidth, plusHeight) {
                this(contentDom, "jpg", width, height, plusWidth, plusHeight);
            },
            pdf: function (contentDom, width, height, plusWidth, plusHeight) {
                this(contentDom, "pdf", width, height, plusWidth, plusHeight);
            },
            xlsx: function (obj, options) {
                // styleFunction (rowIndex, columnIndex, value, headerText, item, dataField) 
                if (Array.isArray(obj)) {
                    var grid = $('<table id="table">');
                    micaCommon.grid.set(grid, { data: obj });
                    //gridToExcel(grid, options);
                    gridToExcel(el.jqGrid("getGridParam"), options);
                } else {
                    var el = typeof obj == "string" ? $(obj) : obj;
                    options = options || {};
                    var flag = el.hasClass("w-widget");
                    flag = flag || el.hasClass("w-widget-jqgrid");
                    var divFlag = el[0].tagName.toLowerCase() == "div";
                    flag = flag && divFlag;
                    if (flag) {
                        el = el.find("#table_" + el.attr("id"));
                    }
                    var data = el.jqGrid("getGridParam");
                    if (data.data.length < 1) {
                        data.data = el.jqGrid("getRowData");
                    }
                    options.grid = options.grid || "grid";
                    options.gridParam = el.jqGrid("getGridParam");
                    if (options.grid == "grid")
                        //gridToExcel(el, options);
                        gridToExcel(el.jqGrid("getGridParam"), options);
                    else if (options.grid == "pivot")
                        pivotToExcel(el, options);
                }
            }
        })
    ),
    upload: (function (args) {
        var f = function (options) {
            // options : {
            //       url : ""  // postUrl
            //       ajaxService : function(data) // ajax를 직접 작성 할수 있다. ajax는 꼭 return을 해주자. 이 경우 options.url을 안씀.
            //                   ex -> function(data) {
            //                             return $.ajax({});
            //                         }
            //       callBack : before, after (open) // 팝업이 열린 후, 업로드가 완료된 후
            // }
            options = options || {};
            var popup = window.open('/micaweb/Content/PopUp/Excel/ExcelUpload.html', 'ExcelUp', 'width=601,height=436,top=100,left=100');
            micaCommon.fncS.callBackExec(options.before, popup);
            popup.options = options;
        };

        for (i in args) {
            f[i] = args[i];
        }
        return f;
    }
        ({
            excel: function (contentDom, width, height, plusWidth, plusHeight) {
                this(contentDom, "png", width, height, plusWidth, plusHeight);
            }
        }))
    ,
    restFul: {
        mapping: function (data, columnName, rowsName) {
            var column = this.hierarchyReturn(data, columnName);
            var rows = this.hierarchyReturn(data, rowsName);
            column = this.column(column, "ColumnName", "Alias");

            return this.rowsSet(rows, column);
        },
        column: function (data, columnName, alias) {
            var result = {};
            $.each(data, function (key, value) {
                result[value[alias]] = value[columnName];
            });
            return result;
        },
        rowsSet: function (rows, column) {
            var results = [];
            $.each(rows, function (i, row) {
                result = {};
                $.each(row, function (key, value) {
                    result[column[key]] = value;
                });
                results.push(result);
            });
            return results;
        },
        hierarchyReturn: function (data, hierarchy) {
            return micaCommon.fncS.hierarchyReturn(data, hierarchy);
            //var hierarchys = [];
            //if (typeof hierarchy == "string") { 
            //    hierarchys = hierarchy.split(".");
            //} else {
            //    hierarchys = hierarchy;
            //}

            //var nowHierarachy = hierarchys.shift();
            //data = data[nowHierarachy];

            //if (hierarchys.length > 0) {
            //    data = this.hierarchyReturn(data, hierarchys);
            //}
            //return data;
        }
    },
    topNaviMenu: {
        set: function (el, dataOptions, dataSource) {
            dataOptions = dataOptions || {};
            var record = [];
            if (dataOptions.url) {
                ajaxService(dataOptions.data, dataOptions.url, null, dataOptions.mtype).done(function (data) {
                    record = micaCommon.topNaviMenu.settingData(data, dataSource);
                    micaCommon.topNaviMenu.makeMenu(el, record);
                });
            }
        },
        settingData: function (data, dataSource) {
            var source = {};
            var dataField = [];
            for (key in dataSource) {
                dataField.push({ "name": dataSource[key] });
            }

            var source =
               {
                   datafields: dataField,
                   datatype: "json",
                   localdata: data,
                   id: dataSource.id
               };

            var dataAdapter = new $.jqx.dataAdapter(source);
            dataAdapter.dataBind();
            var records = dataAdapter.getRecordsHierarchy(dataSource.id, dataSource.parentid, "items",
                [
                     { name: dataSource.id, map: 'MENUID' }
                   , { name: dataSource.text, map: 'MENUNAME' }
                   , { name: dataSource.icon, map: 'VIEWTYPE' }
                   , { name: dataSource.href, map: 'HREF' }
                ]);
            return records;
        },
        makeMenu: function (el, records) {
            //$('.nav-menu').html('');
            //el = $('.nav-menu');
            el = $(el);
            el.html("");
            el.addClass('nav-menu');
            var topNavi = $('<nav/>', {
                'class': 'nav-menu'
            });
            el.append(topNavi);
            // TODO : 동적으로 사이즈를 잡을 수 있어야 함
            $(el).parent().css('max-width', '2000px');
            $.each(records, function (i, level1) {
                var lvl1Dropdown = $('<div/>', {
                    'data-delay': "0",
                    'class': "w-dropdown nav-dropdown"
                });
                lvl1Dropdown.on('click', function () {
                    $(this).siblings().find(".w--open").removeClass('w--open');
                    //$('.w-dropdown.nav-dropdown').removeClass('w--open');
                    //$('.w-dropdown-list.dropmenu').removeClass('w--open');
                    //$(this).addClass('w--open');
                    //$(this).find('nav').addClass('w--open');
                    var menuLvl2BgWidth = $('.menu-lvl2g').width();
                    var navWidth = Math.round((($($('na-bv')[0]).width()) / menuLvl2BgWidth) * menuLvl2BgWidth + 2);
                    $('.menu-pop-bg').css('max-width', navWidth);

                    // 전체 사이즈에 대한 분기 필요
                    if ($(this).offset().left + $(this).find('nav').width() > $('.nav-dropdown').last().offset().left + $('.nav-dropdown').last().width()) {
                        var menuPop = $(this).find('.w-clearfix.menu-pop-bg');
                        $(menuPop).offset({ left: ($('.nav-dropdown').last().offset().left + $(menuPop).parents('.nav-dropdown').width()) - $(menuPop).width() + 10 });
                    }
                });

                topNavi.append(lvl1Dropdown);

                var menuLvl1 = $('<div/>', {
                    'class': "w-dropdown-toggle menu-lvl1"
                });
                lvl1Dropdown.append(menuLvl1);

                var topNavTxt = $('<div/>', {
                    'class': "top-nav-txt",
                    'html': level1.MENUNAME
                });
                menuLvl1.append(topNavTxt);
                var topNavIcon = $('<div/>', {
                    "class": "w-icon fa fa-angle-down"

                });
                menuLvl1.on('click', function () {
                    $(this).siblings().find(".w--open").toggleClass('w--open');
                    $(this).toggleClass('w--open');
                    $(this).next().toggleClass('w--open');
                });
                menuLvl1.append(topNavIcon);

                if (typeof level1.items != 'undefined' && level1.items.length > 0) {

                    //var menuLvl2BgWidth = $('.menu-lvl2-bg').width();

                    var lvl2Dropdown = $('<nav/>', {
                        'class': "w-dropdown-list dropmenu"
                    });
                    lvl1Dropdown.append(lvl2Dropdown);
                    var menuPopBg = $('<div/>', {
                        'class': 'w-clearfix menu-pop-bg',
                        'style': 'width:' + (level1.items.length * 165) + 'px'
                    });
                    lvl2Dropdown.append(menuPopBg);

                    $.each(level1.items, function (j, level2) {

                        var menuLvl2Bg = $('<div/>', {
                            'class': 'menu-lvl2-bg'
                        });
                        menuPopBg.append(menuLvl2Bg);
                        var menuLvl2 = $('<div/>', {
                            'class': 'menu-lvl2'
                        });
                        menuLvl2Bg.append(menuLvl2);

                        var menuLvl2Icon = $('<div/>', {
                            'class': 'w-icon fa fa-caret-down link-icon'
                        });
                        menuLvl2.append(menuLvl2Icon);
                        var menuLvl2Txt = $('<div/>', {
                            'class': 'menu-txt',
                            'html': level2.MENUNAME
                        });
                        menuLvl2.append(menuLvl2Txt);

                        if (typeof level2.items != 'undefined' && level2.items.length > 0) {
                            // Level 3

                            $.each(level2.items, function (k, level3) {
                                var menuLvl3 = $('<a/>', {
                                    'class': 'w-inline-block menu-lvl3',
                                    'href': level3.HREF
                                });
                                menuLvl2Bg.append(menuLvl3);

                                var menuLvl3Icon = $('<div/>', {
                                    'class': 'w-icon fa fa-angle-right link-icon'
                                });
                                menuLvl3.append(menuLvl3Icon);

                                var menuLvl3Txt = $('<div/>', {
                                    'class': 'menu-txt',
                                    'html': level3.MENUNAME
                                });
                                menuLvl3.append(menuLvl3Txt);
                            });
                        }
                    });
                }
            });
            $('html').click(function (e) {
                //if (flag&&e.target.className != "w-dropdown-list dropmenu w--open") {
                //    $('.w-dropdown.nav-dropdown').removeClass('w--open');
                //    $('.w-dropdown-list.dropmenu').removeClass('w--open');
                //}
                //flag = true;
                var flag = $(e.target).is($('nav *'));
                if (!flag) {
                    $('.w-dropdown.nav-dropdown').removeClass('w--open');
                    $('.w-dropdown-list.dropmenu').removeClass('w--open');
                }
            })
        }
    },
    topMenu: {
        linkType: "PAGE",
        tabEl: null,
        tabContentEl: null,
        navString: "",
        navArray: [],
        classData: {
            level1: { nav: "", ul: "", li: "", a: "", dropdown: { div: "", text: "", icon: "" } },
            level2: { nav: "", ul: "", li: "", a: "", dropdown: { div: "", text: "", rightIcon: "", downIcon: "" } },
            level3: { nav: "", ul: "", li: "", a: "" }
        },
        set: function (el, dataOptions, dataSource) {
            /*
            el : 메뉴 element
            dataOptions : ajax 서비스를 위한 옵션
              {
                 data(필수) : ajax 서비스를 위한 request data 객체 
                ,url(필수) : ajax URL
                ,mtype  : method type -ex)GET, POST
                ,async  : async 옵션 -ex) true, false
                ,successFn : 성공 콜백 함수
                ,errorFn : 에러 콜백 함수
              }
            dataSource : Hierarchy 구조에 추가할 data의 컬럼 
                {
                  id(필수) : data의 ID
                 ,parentid(필수)  :   data의 부모ID
                 ,text(필수)  : 메뉴 Text
                 ,icon : 메뉴 아이콘
                 ,href : 메뉴 링크 URL
                 (key(임의변수):value(data 컬럼)로 추가 가능)
                }
            */
            dataOptions = dataOptions || {};
            var options = dataOptions.async != null ? { async: dataOptions.async } : null;
            var record = [];
            if (dataOptions.url) {
                ajaxService(dataOptions.data, dataOptions.url, dataOptions.successFn, dataOptions.mtype, dataOptions.errorFn, options).done(function (data) {
                    record = micaCommon.topMenu.settingData(data, dataSource);
                    micaCommon.topMenu.makeMenu(el, record);
                });
            }

        },
        settingData: function (data, dataSource) {
            /*
            data : id와 부모id로 구성된 데이터
            dataSource : Hierarchy 구조에 추가할 data의 컬럼 
                {
                  id(필수) : data의 ID
                 ,parentid(필수)  :   data의 부모ID
                 ,text(필수)  : 메뉴 Text
                 ,icon : 메뉴 아이콘
                 ,href : 메뉴 링크 URL
                 (key(임의변수):value(data 컬럼)로 추가 가능)
                }
            */
            var source = {};
            var dataField = [];
            for (key in dataSource) {
                dataField.push({ "name": dataSource[key] });
            }

            var source =
               {
                   datafields: dataField,
                   datatype: "json",
                   localdata: data,
                   id: dataSource.id
               };

            var dataAdapter = new $.jqx.dataAdapter(source);
            dataAdapter.dataBind();
            var records = dataAdapter.getRecordsHierarchy(dataSource.id, dataSource.parentid, "items",
                [
                     { name: dataSource.id, map: 'MENUID' }
                   , { name: dataSource.text, map: 'MENUNAME' }
                   , { name: dataSource.icon, map: 'VIEWTYPE' }
                   , { name: dataSource.href, map: 'HREF' }
                ]);
            return records;
        },
        dataSort: function (seq, hierarchyData) {

            //data 시퀀스 기준으로 정렬
            hierarchyData.sort(function (a, b) {
                return a[seq] < b[seq] ? -1 : a[seq] > b[seq] ? 1 : 0;
            });
            //2레벨 메뉴 정렬
            $.each(hierarchyData, function (index, level1) {
                //3레벨 메뉴 정렬
                if (typeof level1.items != 'undefined' && level1.items.length > 0) {
                    level1.items.sort(function (a, b) {
                        return a[seq] < b[seq] ? -1 : a[seq] > b[seq] ? 1 : 0;
                    });

                    $.each(level1.items, function (index, level2) {
                        if (typeof level2.items != 'undefined' && level2.items.length > 0) {
                            level2.items.sort(function (a, b) {
                                return a[seq] < b[seq] ? -1 : a[seq] > b[seq] ? 1 : 0;
                            });
                        }
                    });
                }
            });
            return hierarchyData;
        },
        makeMenu: function (el, hierarchyData) {
            //el : element
            //hierarchyData : hierarchy 구조의 데이터
            var locVal = location.href.split("/").pop().split("?")[0].split("#")[0];
            var tagLocVal;
            var tempVal;
            $(document).on('click', function () {
                $(".w-nav .is-show", parent.document).toggleClass("is-show");
                //                $(el).find('.is-show').toggleClass('is-show');
                //                $(el).next().find('.is-show').toggleClass('is-show');
            });
            el = typeof el == "string" ? $(el) : el;

            var rootAClass = el.find('.w-nav-brand').attr('class');
            var rootAHref = el.find('.w-nav-brand').attr('href');
            var navBtnClass = el.find('.w-nav-button').attr('class');
            var navBtnIconClass = el.find('.w-nav-button >.w-icon.fa').attr('class');
            //            el.html('');

            //            var rootA = $('<a/>', {
            //                class: rootAClass,
            //                href: rootAHref
            //            });
            //            el.append(rootA);

            //            var rootNav = $('<nav/>', {
            //                class: "w-nav-menu w-clearfix tm-navmenu " + micaCommon.topMenu.classData.level1.nav
            //            });
            //            el.append(rootNav);
            var rootNav = $(el.find("nav").first());
            rootNav.html("");

            var navBtn = $('<div/>', {
                class: navBtnClass
            });
            el.append(navBtn);

            var navBtnIcon = $('<div/>', {
                class: navBtnIconClass
            });
            navBtn.append(navBtnIcon);

            var lvl1Ul = $('<ul/>', {
                class: "depth1 tm-nav-box " + micaCommon.topMenu.classData.level1.ul
            });
            rootNav.append(lvl1Ul);

            micaCommon.topMenu.navArray = [];

            //1 Level 메뉴 
            $.each(hierarchyData, function (index1, level1) {
                var lvl1Li = $('<li/>', {
                    class: "depth1-menu " + micaCommon.topMenu.classData.level1.li
                });
                lvl1Li.on('click', function (e) {
                    $(this).siblings().find(".is-show").removeClass('is-show');
                    e.stopPropagation();
                });
                lvl1Ul.append(lvl1Li);

                if (null != level1.HREF) {
                    tempVal = level1.HREF.split("/").pop().split("?")[0].split("#")[0];
                    if (locVal == tempVal) {
                        micaCommon.topMenu.navString = level1.MENUNAME;
                        micaCommon.topMenu.navArray.push(level1);
                    }
                }

                if (typeof level1.items == 'undefined' || level1.items.length <= 0) {
                    //2레벨이 없는 경우
                    var lvl1A = $('<a/>', {
                        class: "w-nav-link tm-nav-link tm-txt-lvl1 " + micaCommon.topMenu.classData.level1.a,
                        href: level1.HREF,
                        text: level1.MENUNAME
                    });
                    lvl1A.css("max-width", "100%");

                    if ("TAB" == micaCommon.topMenu.linkType.toUpperCase()) {
                        lvl1A.on('click', function () {
                            lvl1A.attr("href", "#" + level1.MENUID);
                            micaCommon.topMenu.navArray = [];
                            micaCommon.topMenu.navArray.push(level1);
                            micaCommon.tab.addMdiTab(micaCommon.topMenu.tabEl, micaCommon.topMenu.tabContentEl, level1.MENUID, level1.MENUNAME, level1.HREF);
                            $(".is-show").toggleClass("is-show");
                        });
                    }
                    lvl1Li.append(lvl1A);
                } else {
                    //2레벨이 있는경우

                    var lvl1Dropdown = $('<div/>', {
                        'data-delay': "0",
                        class: "w-dropdown menu-sam-width"
                    });
                    lvl1Dropdown.css("max-width", "100%");
                    lvl1Dropdown.on('click', function (e) {
                        $(this).children().toggleClass('is-show');
                    });
                    lvl1Li.append(lvl1Dropdown);
                    //1레벨 메뉴 태크
                    var menuLvl1 = $('<div/>', {
                        class: "w-dropdown-toggle menu-sam-width tm-nav-link " + micaCommon.topMenu.classData.level1.dropdown.div
                    });
                    lvl1Dropdown.append(menuLvl1);
                    //1레벨 텍스트 태그
                    var menuLvl1Txt = $('<div/>', {
                        class: "tm-txt-lvl1 " + micaCommon.topMenu.classData.level1.dropdown.text,
                        text: level1.MENUNAME
                    });
                    menuLvl1.append(menuLvl1Txt);
                    //1레벨 아이콘 태크
                    var menuLvl1Icon = $('<div/>', {
                        class: "w-icon fa fa-sort-down " + micaCommon.topMenu.classData.level1.dropdown.icon
                    });
                    menuLvl1.append(menuLvl1Icon);

                    //2레벨 nav 태그
                    var lvl2DropdownList = $('<nav/>', {
                        class: "w-dropdown-list header-nav " + micaCommon.topMenu.classData.level2.nav
                    });
                    lvl1Dropdown.append(lvl2DropdownList);

                    var lvl2Ul = $('<ul/>', {
                        class: "depth2 tm-lvl1-list " + micaCommon.topMenu.classData.level2.ul
                    });
                    lvl2Ul.on('click', function (e) {
                        e.stopPropagation();
                    });
                    lvl2DropdownList.append(lvl2Ul);

                    //2레벨 시작
                    $.each(level1.items, function (index2, level2) {
                        var lvl2Li = $('<li/>', {
                            class: " " + micaCommon.topMenu.classData.level2.li
                        });
                        lvl2Ul.append(lvl2Li);

                        if (null != level2.HREF) {
                            tempVal = level2.HREF.split("/").pop().split("?")[0].split("#")[0];
                            if (locVal == tempVal) {
                                micaCommon.topMenu.navString = level1.MENUNAME + " > " + level2.MENUNAME;
                                micaCommon.topMenu.navArray.push(level1);
                                micaCommon.topMenu.navArray.push(level2);
                            }
                        }

                        if (typeof level2.items == 'undefined' || level2.items.length <= 0) {
                            //3레벨이 없는 경우
                            var lvl2A = $('<a/>', {
                                class: "w-nav-link tm-lvl2-link tm-txt-lvl2 " + micaCommon.topMenu.classData.level2.a,
                                href: level2.HREF,
                                text: level2.MENUNAME
                            });
                            lvl2A.css("max-width", "100%");

                            if ("TAB" == micaCommon.topMenu.linkType.toUpperCase()) {
                                lvl2A.on('click', function () {
                                    lvl2A.attr("href", "#" + level2.MENUID);
                                    micaCommon.topMenu.navArray = [];
                                    micaCommon.topMenu.navArray.push(level1);
                                    micaCommon.topMenu.navArray.push(level2);
                                    micaCommon.tab.addMdiTab(micaCommon.topMenu.tabEl, micaCommon.topMenu.tabContentEl, level2.MENUID, level2.MENUNAME, level2.HREF);
                                    $(".is-show").toggleClass("is-show");
                                });
                            }
                            lvl2Li.append(lvl2A);
                        } else {
                            //3레벨이 있는 경우
                            var lvl2Dropdown = $('<div/>', {
                                'data-delay': "0",
                                class: "w-dropdown menu-sam-width"
                            });
                            lvl2Dropdown.css("max-width", "100%");

                            lvl2Dropdown.hover(
                               function () {
                                   if ($(window).width() < 1025) {
                                       return;
                                   }
                                   $(this).children().addClass('is-show');
                               },

                               function () {
                                   if ($(window).width() < 1025) {
                                       return;
                                   }
                                   $(this).children().removeClass('is-show');
                               }
                            );
                            lvl2Dropdown.on('click', function (e) {
                                if ($(window).width() >= 1025) {
                                    return;
                                }
                                $(this).children().toggleClass('is-show');
                                //2단 메뉴 클릭시  그 메뉴 외에는 닫기
                                //$(this).parent().siblings().find(".is-show").removeClass('is-show');
                                e.stopPropagation();
                            });
                            lvl2Li.append(lvl2Dropdown);
                            //2레벨 메뉴 태크
                            var menuLvl2 = $('<div/>', {
                                class: "w-dropdown-toggle menu-sam-width tm-menulvl2 " + micaCommon.topMenu.classData.level2.dropdown.div
                            });
                            lvl2Dropdown.append(menuLvl2);
                            //2레벨 텍스트 태그
                            var menuLvl2Txt = $('<div/>', {
                                class: "tm-txt-lvl2 " + micaCommon.topMenu.classData.level2.dropdown.text,
                                text: level2.MENUNAME
                            });
                            menuLvl2.append(menuLvl2Txt);
                            //2레벨 아이콘 태크
                            var menuLvl2RightIcon = $('<div/>', {
                                class: "w-icon fa fa-angle-right icon-right " + micaCommon.topMenu.classData.level2.dropdown.rightIcon
                            });
                            menuLvl2.append(menuLvl2RightIcon);

                            var menuLvl2DownIcon = $('<div/>', {
                                class: "w-icon fa fa-angle-down icon-down " + micaCommon.topMenu.classData.level2.dropdown.downIcon
                            });
                            menuLvl2.append(menuLvl2DownIcon);

                            //3레벨 nav 태그
                            var lvl3DropdownList = $('<nav/>', {
                                'class': "w-dropdown-list header-nav " + micaCommon.topMenu.classData.level3.nav
                            });
                            lvl2Dropdown.append(lvl3DropdownList);

                            var lvl3Ul = $('<ul/>', {
                                class: "depth2 depth3 depth1 " + micaCommon.topMenu.classData.level3.ul
                            });
                            lvl3DropdownList.append(lvl3Ul);

                            //3레벨 시작
                            $.each(level2.items, function (index3, level3) {
                                var lvl3Li = $('<li/>', {
                                    class: " " + micaCommon.topMenu.classData.level3.li
                                });
                                lvl3Ul.append(lvl3Li);

                                var lvl3A = $('<a/>', {
                                    class: "w-nav-link tm-menulvl3 tm-txt-lvl3 " + micaCommon.topMenu.classData.level3.a,
                                    href: level3.HREF,
                                    text: level3.MENUNAME
                                });
                                lvl3A.css("max-width", "100%");

                                if (null != level3.HREF) {
                                    tempVal = level3.HREF.split("/").pop().split("?")[0].split("#")[0];
                                    if (locVal == tempVal) {
                                        micaCommon.topMenu.navString = level1.MENUNAME + " > " + level2.MENUNAME + " > " + level3.MENUNAME;
                                        micaCommon.topMenu.navArray.push(level1);
                                        micaCommon.topMenu.navArray.push(level2);
                                        micaCommon.topMenu.navArray.push(level3);
                                    }
                                }

                                if ("TAB" == micaCommon.topMenu.linkType.toUpperCase()) {
                                    lvl3A.on('click', function () {
                                        lvl3A.attr("href", "#" + level3.MENUID);
                                        micaCommon.topMenu.navArray = [];
                                        micaCommon.topMenu.navArray.push(level1);
                                        micaCommon.topMenu.navArray.push(level2);
                                        micaCommon.topMenu.navArray.push(level3);
                                        micaCommon.tab.addMdiTab(micaCommon.topMenu.tabEl, micaCommon.topMenu.tabContentEl, level3.MENUID, level3.MENUNAME, level3.HREF);
                                        $(".is-show").toggleClass("is-show");
                                    });
                                }
                                lvl3Li.append(lvl3A);
                            });
                        }
                    });
                }

            });
            //길이 초과시 말줄임 표시
            //$(window).resize(function () {
            //   if ($(window).width() < 1025) {
            //        $(".tm-txt-lvl1").css({
            //            "width": $('.tm-menulvl2').width(),
            //            "overflow": "hidden",
            //            "text-overflow": "ellipsis",
            //        });
            //        $(".tm-txt-lvl3").css({
            //            "width": '200px',
            //            "overflow": "hidden",
            //            "text-overflow": "ellipsis",
            //        });
            //   }
            //});          
            Mica.require('navbar').ready();
        },
        makeTabMenu: function (el, tabEl, tabContentEl, dataOptions, dataSource) {
            /*
            el : 메뉴 element
            dataOptions : ajax 서비스를 위한 옵션
              {
                 data(필수) : ajax 서비스를 위한 request data 객체 
                ,url(필수) : ajax URL
                ,mtype  : method type -ex)GET, POST
                ,async  : async 옵션 -ex) true, false
                ,successFn : 성공 콜백 함수
                ,errorFn : 에러 콜백 함수
              }
            dataSource : Hierarchy 구조에 추가할 data의 컬럼 
                {
                  id(필수) : data의 ID
                 ,parentid(필수)  : data의 부모ID
                 ,text(필수)  : 메뉴 Text
                 ,icon : 메뉴 아이콘
                 ,href : 메뉴 링크 URL
                 (key(임의변수):value(data 컬럼)로 추가 가능)
                }
              tabSource : Hierarchy 구조에 추가할 data의 컬럼 
                {
                  tabEl : Tab Element
                 ,tabContentEl : Content Element
                }
            */
            micaCommon.topMenu.linkType = "TAB";
            micaCommon.topMenu.tabEl = tabEl;
            micaCommon.topMenu.tabContentEl = tabContentEl;
            micaCommon.topMenu.set(el, dataOptions, dataSource);

        },

    },
    leftMenu: {
        linkType: "PAGE",
        tabEl: null,
        tabContentEl: null,
        navString: "",
        navArray: [],
        set: function (el, dataOptions, dataSource) {
            /*
            el : 메뉴 element
            dataOptions : ajax 서비스를 위한 옵션
              {
                 data(필수) : ajax 서비스를 위한 request data 객체 
                ,url(필수) : ajax URL
                ,mtype  : method type -ex)GET, POST
                ,async  : async 옵션 -ex) true, false
                ,successFn : 성공 콜백 함수
                ,errorFn : 에러 콜백 함수
              }
            dataSource : Hierarchy 구조에 추가할 data의 컬럼 
                {
                  id(필수) : data의 ID
                 ,parentid(필수)  :   data의 부모ID
                 ,text(필수)  : 메뉴 Text
                 ,icon : 메뉴 아이콘
                 ,href : 메뉴 링크 URL
                 (key(임의변수):value(data 컬럼)로 추가 가능)
                }
            */
            dataOptions = dataOptions || {};
            var options = dataOptions.async != null ? { async: dataOptions.async } : null;
            var record = [];
            if (dataOptions.url) {
                ajaxService(dataOptions.data, dataOptions.url, dataOptions.successFn, dataOptions.mtype, dataOptions.errorFn, options).done(function (data) {
                    record = micaCommon.leftMenu.settingData(data, dataSource);
                    micaCommon.leftMenu.makeMenu(el, record, data);
                });
            }

        },
        settingData: function (data, dataSource) {
            /*
            data : id와 부모id로 구성된 데이터
            dataSource : Hierarchy 구조에 추가할 data의 컬럼 
                {
                  id(필수) : data의 ID
                 ,parentid(필수)  :   data의 부모ID
                 ,text(필수)  : 메뉴 Text
                 ,icon : 메뉴 아이콘
                 ,href : 메뉴 링크 URL
                 (key(임의변수):value(data 컬럼)로 추가 가능)
                }
            */
            var source = {};
            var dataField = [];
            for (key in dataSource) {
                dataField.push({ "name": dataSource[key] });
            }

            var source =
               {
                   datafields: dataField,
                   datatype: "json",
                   localdata: data,
                   id: dataSource.id
               };

            var dataAdapter = new $.jqx.dataAdapter(source);
            dataAdapter.dataBind();
            var records = dataAdapter.getRecordsHierarchy(dataSource.id, dataSource.parentid, "items",
                [
                     { name: dataSource.id, map: 'MENUID' }
                   , { name: dataSource.text, map: 'MENUNAME' }
                   , { name: dataSource.icon, map: 'VIEWTYPE' }
                   , { name: dataSource.href, map: 'HREF' }
                ]);
            return records;
        },
        dataSort: function (seq, hierarchyData) {

            //data 시퀀스 기준으로 정렬
            hierarchyData.sort(function (a, b) {
                return a[seq] < b[seq] ? -1 : a[seq] > b[seq] ? 1 : 0;
            });

            var tempHData = [];
            //2레벨 메뉴 정렬
            $.each(hierarchyData, function (index, level1) {
                //3레벨 메뉴 정렬
                if (typeof level1.items != 'undefined' && level1.items.length > 0) {
                    level1.items.sort(function (a, b) {
                        return a[seq] < b[seq] ? -1 : a[seq] > b[seq] ? 1 : 0;
                    });

                    var tempL1 = [];
                    $.each(level1.items, function (index, level2) {
                        if (typeof level2.items != 'undefined' && level2.items.length > 0) {
                            level2.items.sort(function (a, b) {
                                return a[seq] < b[seq] ? -1 : a[seq] > b[seq] ? 1 : 0;
                            });
                            var tempL2 = [];
                            $.each(level2.items, function (index, level3) {
                                if (level3.MENU_TYPE == "LINK" || level3.MENU_TYPE == "POPUP") {
                                } else {
                                    tempL2.push(level3);
                                }
                            });
                            level2.items = tempL2;
                        }
                        if (level2.MENU_TYPE == "LINK" || level2.MENU_TYPE == "POPUP") {
                        } else {
                            tempL1.push(level2);
                        }
                    });
                    level1.items = tempL1;
                    if (level1.MENU_TYPE == "LINK" || level1.MENU_TYPE == "POPUP") {
                    } else {
                        tempHData.push(level1);
                    }
                }
            });
            hierarchyData = tempHData;
            return hierarchyData;
        },
        makeMenu: function (el, hierarchyData, listData) {
            //el : element
            //hierarchyData : hierarchy 구조의 데이터
            var locVal = location.href.split("/").pop().split("?")[0].split("#")[0];
            var tagLocVal;
            var tempVal;
            //var locObj = micaCommon.fncS.keyValueSet({ data: JSON.parse(sessionStorage.MENU), key: "VIEW_ID" })[location.pathname] || {};
            if (sessionStorage.MENU != null) {
                locObj = micaCommon.fncS.keyValueSet({ data: JSON.parse(sessionStorage.MENU), key: "VIEW_ID" })[location.pathname] || {};
            } else {
                locObj = micaCommon.fncS.keyValueSet({ data: listData, key: "VIEW_ID" })[location.pathname] || {};
            }


            el = typeof el == "string" ? $(el) : el;
            var rootNav = $('<nav/>', {
                'class': "w-nav-menu nav-menu"
            });
            el.append(rootNav);

            micaCommon.leftMenu.navArray = [];

            //1 Level 메뉴
            $.each(hierarchyData, function (index1, level1) {

                var lvl1Dropdown = $('<div/>', {
                    'data-delay': "0",
                    'class': "w-dropdown left-dropdown"
                });
                lvl1Dropdown.on('click', function () {
                    $(this).siblings().find(".w--open").removeClass('w--open');
                });

                rootNav.append(lvl1Dropdown);

                var menuLvl1 = $('<div/>', {
                    'class': "w-dropdown-toggle left-menu-lvl1"
                });

                //1레벨 이벤트 설정
                if (typeof level1.items != 'undefined' && level1.items.length > 0) {
                    menuLvl1.on('click', function () {
                        $(this).siblings().find(".w--open").toggleClass('w--open');
                        $(lvl2DropdownList).toggleClass('w--open');
                        tempVal = $(this).siblings().find(".fa-minus-square-o");
                        tempVal.toggleClass('fa-minus-square-o');
                        tempVal.toggleClass('fa-plus-square-o');
                        tempVal = null;
                    })
                } else {
                    if (null != level1.HREF && typeof level1.HREF != 'undefined' && level1.HREF.length > 0) {
                        if ("PAGE" == micaCommon.leftMenu.linkType.toUpperCase()) {
                            menuLvl1.on('click', function () {
                                location.href = level1.HREF;
                            })
                        } else if ("TAB" == micaCommon.leftMenu.linkType.toUpperCase()) {
                            menuLvl1.on('click', function () {
                                micaCommon.leftMenu.navArray = [];
                                micaCommon.leftMenu.navArray.push(level1);
                                micaCommon.tab.addTab(micaCommon.leftMenu.tabEl, micaCommon.leftMenu.tabContentEl, level1.MENUID, level1.MENUNAME, level1.HREF);
                                window.location.hash = level1.MENUID;
                            })
                        }
                    }

                }

                lvl1Dropdown.append(menuLvl1);

                var lvl1TxtBox = $('<div/>', {
                    'class': "w-clearfix menu-txt-box"
                });
                menuLvl1.append(lvl1TxtBox);

                var menuLvl1Txt = $('<div/>', {
                    id: level1.id,
                    'class': "menu-txt",
                    text: level1.MENUNAME
                });
                lvl1TxtBox.append(menuLvl1Txt);

                var icon = level1.VIEWTYPE || "";
                var topNavIcon = $('<div/>', {
                    'class': "w-icon fa " + icon + " menu-icon"
                });
                lvl1TxtBox.append(topNavIcon);

                //전 페이지 메뉴 클릭에 따른 글색 변경
                if (null != level1.HREF) {
                    tempVal = level1.HREF.split("/").pop().split("?")[0].split("#")[0];
                }
                if (locVal == tempVal || locObj.REASON_CODE == level1.MENU_ID) {
                    $(menuLvl1Txt).toggleClass('active');
                    micaCommon.leftMenu.navString = level1.MENUNAME;
                    micaCommon.leftMenu.navArray.push(level1);
                }
                tempVal = null;

                //2 Level 메뉴 여부 확인 및 추가
                if (typeof level1.items != 'undefined' && level1.items.length > 0) {

                    var topNavRightIcon = $('<div/>', {
                        'class': "w-icon fa fa-sort-desc",
                    });
                    menuLvl1.append(topNavRightIcon);

                    var lvl2DropdownList = $('<nav/>', {
                        'class': "w-dropdown-list left-dropdown-list"
                    });
                    lvl1Dropdown.append(lvl2DropdownList);

                    $.each(level1.items, function (index2, level2) {

                        var lvl2Dropdown = $('<div/>', {
                            'class': "w-dropdown left-dropdown-lvl2"
                        });

                        if (typeof level2.items != 'undefined' && level2.items.length > 0) {
                            lvl2Dropdown.on('click', function () {
                                $(this).siblings().find(".w--open").toggleClass('w--open');
                                $(lvl3DropdownList).toggleClass('w--open');
                                $(lvl2NavRightIcon).toggleClass('fa-minus-square-o');
                                $(lvl2NavRightIcon).toggleClass('fa-plus-square-o');
                                tempVal = $(this).siblings().find(".fa-minus-square-o");
                                tempVal.toggleClass('fa-minus-square-o');
                                tempVal.toggleClass('fa-plus-square-o');
                                tempVal = null;
                            })
                        } else {
                            if (null != level2.HREF && typeof level2.HREF != 'undefined' && level2.HREF.length > 0) {
                                if ("PAGE" == micaCommon.leftMenu.linkType.toUpperCase()) {
                                    lvl2Dropdown.on('click', function () {
                                        location.href = level2.HREF;
                                    })
                                } else if ("TAB" == micaCommon.leftMenu.linkType.toUpperCase()) {
                                    lvl2Dropdown.on('click', function () {
                                        micaCommon.leftMenu.navArray = [];
                                        micaCommon.leftMenu.navArray.push(level1);
                                        micaCommon.leftMenu.navArray.push(level2);
                                        micaCommon.tab.addTab(micaCommon.leftMenu.tabEl, micaCommon.leftMenu.tabContentEl, level2.MENUID, level2.MENUNAME, level2.HREF);
                                        window.location.hash = level2.MENUID;
                                    })
                                }
                            }
                        }

                        $(lvl2Dropdown).css('max-width', '100%');
                        lvl2DropdownList.append(lvl2Dropdown);

                        var menuLvl2 = $('<div/>', {
                            'data-ix': "open-icon",
                            'class': "w-dropdown-toggle w-clearfix left-menu-lvl2"
                        });
                        lvl2Dropdown.append(menuLvl2);

                        var lvl2NavLeftIcon = $('<div/>', {
                            'class': "circle-box"
                        });
                        menuLvl2.append(lvl2NavLeftIcon);

                        var menuLvl2Txt = $('<div/>', {
                            id: level2.id,
                            'class': "menu-txt-lvl2",
                            text: level2.MENUNAME
                        });
                        menuLvl2.append(menuLvl2Txt);

                        //전 페이지 메뉴 클릭에 따른 1레벨 메뉴 펼치기
                        if (null != level2.HREF) {
                            tempVal = level2.HREF.split("/").pop().split("?")[0].split("#")[0];
                        }
                        if (locVal == tempVal || locObj.REASON_CODE == level2.MENU_ID) {
                            $(menuLvl1).trigger("click");
                            $(menuLvl2Txt).toggleClass('active');
                            micaCommon.leftMenu.navString = level1.MENUNAME + ">" + level2.MENUNAME;
                            micaCommon.leftMenu.navArray.push(level1);
                            micaCommon.leftMenu.navArray.push(level2);
                        }
                        tempVal = null;

                        //3 Level 메뉴 여부 확인 및 추가
                        if (typeof level2.items != 'undefined' && level2.items.length > 0) {

                            var lvl2NavRightIcon = $('<div/>', {
                                'class': "w-icon fa fa-plus-square-o"
                            });
                            menuLvl2.append(lvl2NavRightIcon);

                            var lvl3DropdownList = $('<nav/>', {
                                'class': "w-dropdown-list left-dropdown-list2"
                            });
                            lvl2Dropdown.append(lvl3DropdownList);

                            $.each(level2.items, function (index3, level3) {

                                var menuLvl3 = $('<a/>', {
                                    id: level3.id,
                                    href: level3.HREF,
                                    'class': 'w-dropdown-link left-menu-lvl3'
                                });

                                if ("TAB" == micaCommon.leftMenu.linkType.toUpperCase()) {
                                    menuLvl3.on('click', function () {
                                        menuLvl3.attr("href", "#" + level3.MENUID);
                                        micaCommon.leftMenu.navArray = [];
                                        micaCommon.leftMenu.navArray.push(level1);
                                        micaCommon.leftMenu.navArray.push(level2);
                                        micaCommon.leftMenu.navArray.push(level3);
                                        micaCommon.tab.addTab(micaCommon.leftMenu.tabEl, micaCommon.leftMenu.tabContentEl, level3.MENUID, level3.MENUNAME, level3.HREF);
                                    });
                                }
                                lvl3DropdownList.append(menuLvl3);

                                var menuLvl3Txt = $('<div/>', {
                                    'class': 'menu-txt-lvl3',
                                    text: level3.MENUNAME
                                });
                                menuLvl3.append(menuLvl3Txt);

                                var menuLvl3LeftLine = $('<div/>', {
                                    'class': 'line-box'
                                });
                                menuLvl3.append(menuLvl3LeftLine);

                                //전 페이지 메뉴 클릭에 따른 1,2레벨 메뉴 펼치기
                                if (null != level3.HREF) {
                                    tempVal = level3.HREF.split("/").pop().split("?")[0].split("#")[0];
                                }
                                if (locVal == tempVal || locObj.REASON_CODE == level3.MENU_ID) {
                                    $(menuLvl1).trigger("click");
                                    $(lvl2Dropdown).trigger("click");
                                    $(menuLvl3Txt).toggleClass('active');
                                    micaCommon.leftMenu.navString = level1.MENUNAME + " > " + level2.MENUNAME + " > " + level3.MENUNAME;
                                    micaCommon.leftMenu.navArray.push(level1);
                                    micaCommon.leftMenu.navArray.push(level2);
                                    micaCommon.leftMenu.navArray.push(level3);
                                }
                                tempVal = null;

                            });
                        }

                    });
                }
            });
            //길이 초과시 말줄임 표시
            var menuWidth;
            $(".menu-txt").css({
                //"width": (el.width() - 15) + 'px',
                "overflow": "hidden",
                "text-overflow": "ellipsis",
                "white-space": "nowrap"
            });

            //var menuWidth = el.width() - parseInt($(".menu-txt-lvl2").css('padding-left').replace(/px/,'')) - parseInt($(".menu-txt-lvl2").css('margin-left').replace(/px/,'')) - $(".menu-txt-lvl2").prev().width()- $(".menu-txt-lvl2").next().width();
            //var menuWidth = (el.width() - 20) - $('.menu-txt-lvl2').offset().left - parseInt($(".menu-txt-lvl2").css('padding-left').replace(/px/,''));

            var menuWidth = el.width() - 20;
            $(".menu-txt-lvl2").css({
                //"width": menuWidth + 'px',
                "overflow": "hidden",
                "text-overflow": "ellipsis",
                "white-space": "nowrap"
            });
            $(".menu-txt-lvl2").next().css('margin-left', '5px');
            //menuWidth = (el.width() - 20) - parseInt($(".menu-txt-lvl3").css('padding-left').replace(/px/,'')) - parseInt($(".menu-txt-lvl3").css('margin-left').replace(/px/,''));
            $(".menu-txt-lvl3").css({
                //"width": el.width() + 'px',
                "overflow": "hidden",
                "text-overflow": "ellipsis",
                "white-space": "nowrap"
            });

            $('.w-dropdown-toggle').css('padding-right', '0px');
        },
        makeTabMenu: function (el, tabEl, tabContentEl, dataOptions, dataSource) {
            /*
            el : 메뉴 element
            dataOptions : ajax 서비스를 위한 옵션
              {
                 data(필수) : ajax 서비스를 위한 request data 객체 
                ,url(필수) : ajax URL
                ,mtype  : method type -ex)GET, POST
                ,async  : async 옵션 -ex) true, false
                ,successFn : 성공 콜백 함수
                ,errorFn : 에러 콜백 함수
              }
            dataSource : Hierarchy 구조에 추가할 data의 컬럼 
                {
                  id(필수) : data의 ID
                 ,parentid(필수)  : data의 부모ID
                 ,text(필수)  : 메뉴 Text
                 ,icon : 메뉴 아이콘
                 ,href : 메뉴 링크 URL
                 (key(임의변수):value(data 컬럼)로 추가 가능)
                }
              tabSource : Hierarchy 구조에 추가할 data의 컬럼 
                {
                  tabEl : Tab Element
                 ,tabContentEl : Content Element
                }
            */
            micaCommon.leftMenu.linkType = "TAB";
            micaCommon.leftMenu.tabEl = tabEl;
            micaCommon.leftMenu.tabContentEl = tabContentEl;
            micaCommon.leftMenu.set(el, dataOptions, dataSource);

        }
    },
    menuObject: {
        set: function () {
            //enable true false -> disable, // 태그 속성
            //visible true false -> hidden // 클래스 hidden
            //sessionStorage.setItem("OBJECT", JSON.stringify(
            //  [
            //    {
            //        ENABLE: "Y",
            //        VISIBLE: "N",
            //        MENU_ID: "index",
            //        OBJECT_ID: "#btnLogin"
            //    }
            //]
            //)
            //);

            var objs = sessionStorage.OBJECT || "[]";
            objs = JSON.parse(objs);
            //console.log(objs);
            //var htmlName = location.pathname.replace(/\.html|\//gi, "").toLowerCase();
            var htmlName = location.pathname.replace(/\.html|\//gi, "");
            for (var i in objs) {
                var obj = objs[i];
                if (htmlName == obj.MENU_ID) {
                    if (obj.ENABLE == "N") {
                        //$(obj.OBJECT_ID).replaceTag("<button>");
                        var className = $(obj.OBJECT_ID).attr("class") || "";
                        var name = $(obj.OBJECT_ID).attr("name") || "";
                        var id = $(obj.OBJECT_ID).attr("id") || "";
                        $(obj.OBJECT_ID).replaceWith($('<button id="' + id + '" name="' + name + '" class="' + className + '">' + $(obj.OBJECT_ID).html() + '</button>'));
                        $(obj.OBJECT_ID).attr("disabled", true);
                    }
                    if (obj.VISIBLE == "N") {
                        //$(obj.OBJECT_ID).css("visibility", "hidden");
                        $(obj.OBJECT_ID).remove();
                    }
                }
            }

        }
    },
    tab: {
        maxTab: 10,
        delIcon: "fa-remove",
        iconHasDel: true,
        mdiTabClass: {
            li: "mdi-click-tab",
            tab: "w-inline-block mdi-tab-link",
            tabToggle: "mdi-active",
            close: "",
            content: "mdi-content",
            contentToggle: "mdi-current"
        },
        addTab: function (tabEl, tabContentEl, tabId, tabTitle, tabUrl) {
            /*
                tabEl : Tab Element
                tabContentEl : Content Element
                tabId : Tab ID
                tabTitle : Tab Text
                tabUrl : tab Link URL
            */

            //최상의 태그
            tabEl = typeof tabEl == "string" ? $(tabEl) : tabEl;
            tabContentEl = typeof tabContentEl == "string" ? $(tabContentEl) : tabContentEl;

            //tab open 여부 확인
            var tabIdVal = "#tab-" + tabId;
            if (0 < $(tabIdVal).length) {
                $(tabIdVal).trigger("click");
                return false;
            }

            //maxTab 체크
            var tabCnt = $("li.click-tab").length;
            if (micaCommon.tab.maxTab <= tabCnt) {
                micaCommon.notication.open("error", "탭은 최대 " + micaCommon.tab.maxTab + "개를 초과 할수 없습니다.");
                return false;
            }

            //Element 비활성화
            $(".content.current").toggleClass("current");
            $(".w-inline-block.nav-tab-link.nav-active").toggleClass("nav-active");

            //new 태그 생성
            var newtabList;

            //
            if (null != tabEl && typeof tabEl.children() != 'undefined' && 0 >= tabEl.children().length) {
                newtabList = $('<ul/>', {
                    'class': "w-list-unstyled recent-tab"
                });
                $(tabEl).append(newtabList);

            } else {
                newtabList = $("ul.w-list-unstyled.recent-tab");
            }

            var newTab = $('<li/>', {
                'class': "click-tab"
            });
            $(newtabList).append(newTab);

            var tabLink = $('<a/>', {
                id: "tab-" + tabId,
                href: '#' + tabId,
                class: "w-inline-block nav-tab-link nav-active"
            });
            tabLink.on('click', function () {
                if (!$(this).hasClass("nav-active")) {
                    $(".content.current").toggleClass("current");
                    $(".w-inline-block.nav-tab-link.nav-active").toggleClass("nav-active");
                    $(this).toggleClass("nav-active");
                    $(newContent).toggleClass("current");
                    micaCommon.pageUrl = tabUrl;
                }
            });
            $(newTab).append(tabLink);

            var tabText = $('<div/>', {
                text: tabTitle,
                class: "tab-txt"
            });
            $(tabLink).append(tabText);

            var tabicon = $('<div/>', {
                class: "w-icon fa " + micaCommon.tab.delIcon + " icon"
            });
            if (micaCommon.tab.iconHasDel) {
                tabicon.on('click', function (e) {
                    if ($(tabLink).hasClass("nav-active")) {
                        newTab.siblings().last().find("a").trigger("click");
                    }
                    $(newContent).remove();
                    $(newTab).remove();
                    e.preventDefault()
                });
            }
            $(tabLink).append(tabicon);
            micaCommon.pageUrl = tabUrl;
            //new teb content 생성
            var newContent = $('<div/>', {
                id: "cont-" + tabId,
                class: "content current"
            });
            $(tabContentEl).append(newContent);

            var contentBox = $('<div/>', {
                class: "content-box"
            });
            $(newContent).append(contentBox);

            var iframe = $('<iframe/>', {
                src: tabUrl,
                id: 'iframe' + tabId,
                width: '100%',
                height: '1000px',
                frameborder: "0",
                scrolling: "no",
                marginwidth: "0",
                marginheight: "0",
                leftmargin: "0",
                topmargin: "0"
            });
            $(contentBox).append(iframe);

            //다음 호출을 위한 설정값 초기화
            micaCommon.tab.delIcon = "fa-remove";
            micaCommon.tab.iconHasDel = true;
        },
        addMdiTab: function (tabEl, tabContentEl, tabId, tabTitle, tabUrl) {
            /*
                tabEl : Tab Element
                tabContentEl : Content Element
                tabId : Tab ID
                tabTitle : Tab Text
                tabUrl : tab Link URL
            */

            //최상의 태그
            tabEl = typeof tabEl == "string" ? $(tabEl) : tabEl;
            tabContentEl = typeof tabContentEl == "string" ? $(tabContentEl) : tabContentEl;

            //tab open 여부 확인
            var tabIdVal = "#tab-" + tabId;
            if (0 < $(tabIdVal).length) {
                $(tabIdVal).trigger("click");
                return false;
            }

            //maxTab 체크
            var tabCnt = $("li." + micaCommon.tab.mdiTabClass.li.replace(" ", ".")).length;
            if (micaCommon.tab.maxTab <= tabCnt) {
                micaCommon.notication.open("error", "탭은 최대 " + micaCommon.tab.maxTab + "개를 초과 할수 없습니다.");
                return false;
            }

            //Element 비활성화
            $("." + micaCommon.tab.mdiTabClass.tab.replace(" ", ".") + "." + micaCommon.tab.mdiTabClass.tabToggle).toggleClass(micaCommon.tab.mdiTabClass.tabToggle);
            $("." + micaCommon.tab.mdiTabClass.content.replace(" ", ".") + "." + micaCommon.tab.mdiTabClass.contentToggle).toggleClass(micaCommon.tab.mdiTabClass.contentToggle);

            //new 태그 생성
            var newtabList;

            //
            if (null != tabEl && typeof tabEl.children() != 'undefined' && 0 >= tabEl.children().length) {
                newtabList = $('<ul/>', {
                    'class': "w-list-unstyled recent-tab"
                });
                $(tabEl).append(newtabList);

            } else {
                newtabList = $("ul.w-list-unstyled.recent-tab");
            }

            var newTab = $('<li/>', {
                'class': micaCommon.tab.mdiTabClass.li,
                'style': "padding-right:3px;"
            });
            $(newtabList).append(newTab);

            var tabLink = $('<a/>', {
                id: "tab-" + tabId,
                href: '#' + tabId,
                class: micaCommon.tab.mdiTabClass.tab + " " + micaCommon.tab.mdiTabClass.tabToggle
            });
            tabLink.on('click', function () {
                if (!$(this).hasClass("nav-active")) {
                    $("." + micaCommon.tab.mdiTabClass.tab.replace(" ", ".") + "." + micaCommon.tab.mdiTabClass.tabToggle).toggleClass(micaCommon.tab.mdiTabClass.tabToggle);
                    $("." + micaCommon.tab.mdiTabClass.content.replace(" ", ".") + "." + micaCommon.tab.mdiTabClass.contentToggle).toggleClass(micaCommon.tab.mdiTabClass.contentToggle);
                    $(this).toggleClass(micaCommon.tab.mdiTabClass.tabToggle);
                    $(newContent).toggleClass(micaCommon.tab.mdiTabClass.contentToggle);
                    micaCommon.pageUrl = tabUrl;
                }
            });
            $(newTab).append(tabLink);

            var tabText = $('<div/>', {
                text: tabTitle,
                class: "tab-txt"
            });
            $(tabLink).append(tabText);

            var tabicon = $('<div/>', {
                class: "w-icon fa " + micaCommon.tab.delIcon + " mdi-tab-close " + micaCommon.tab.mdiTabClass.close
                // class: "w-icon fa fa-times mdi-tab-close"
            });
            if (micaCommon.tab.iconHasDel) {
                tabicon.on('click', function (e) {
                    if ($(tabLink).hasClass(micaCommon.tab.mdiTabClass.tabToggle)) {
                        newTab.siblings().last().find("a").trigger("click");
                    }
                    $(newContent).remove();
                    $(newTab).remove();
                    e.preventDefault()
                });
            }
            $(tabLink).append(tabicon);
            micaCommon.pageUrl = tabUrl;
            //new teb content 생성
            var newContent = $('<div/>', {
                id: "cont-" + tabId,
                class: micaCommon.tab.mdiTabClass.content + " " + micaCommon.tab.mdiTabClass.contentToggle
            });
            $(tabContentEl).append(newContent);

            var contentBox = $('<div/>', {
                class: "content-box"
            });
            $(newContent).append(contentBox);

            var iframe = $('<iframe/>', {
                src: tabUrl,
                id: 'iframe' + tabId,
                width: '100%',
                height: '1000px',
                frameborder: "0",
                scrolling: "no",
                marginwidth: "0",
                marginheight: "0",
                leftmargin: "0",
                topmargin: "0"
            });
            $(contentBox).append(iframe);
            $(window).resize();
            //다음 호출을 위한 설정값 초기화
            micaCommon.tab.delIcon = "fa-remove";
            micaCommon.tab.iconHasDel = true;
            return true;
        },
        nonDelTab: function (tabEl, tabContentEl, tabId, tabTitle, tabUrl) {
            /*
                tabEl : Tab Element
                tabContentEl : Content Element
                tabId : Tab ID
                tabTitle : Tab Text
                tabUrl : tab Link URL
            */

            micaCommon.tab.delIcon = "fa-bookmark-o";
            micaCommon.tab.iconHasDel = false;
            micaCommon.tab.addTab(tabEl, tabContentEl, tabId, tabTitle, tabUrl);

            //뒤로가기 버튼 클릭시 탭이동
            $(window).on('hashchange', function (e) {
                var hashTabId = "#tab-" + location.hash.substring(1);
                if (0 >= $(hashTabId).length) {
                    hashTabId = "#tab-" + tabId;
                }
                $(hashTabId).trigger("click");
                $(hashTabId).focus();
            });
        },
        nonDelMdiTab: function (tabEl, tabContentEl, tabId, tabTitle, tabUrl) {
            /*
                tabEl : Tab Element
                tabContentEl : Content Element
                tabId : Tab ID
                tabTitle : Tab Text
                tabUrl : tab Link URL
            */

            micaCommon.tab.delIcon = "fa-bookmark-o";
            micaCommon.tab.iconHasDel = false;
            micaCommon.tab.addMdiTab(tabEl, tabContentEl, tabId, tabTitle, tabUrl);

            //뒤로가기 버튼 클릭시 탭이동
            $(window).on('hashchange', function (e) {
                var hashTabId = "#tab-" + location.hash.substring(1);
                if (0 >= $(hashTabId).length) {
                    hashTabId = "#tab-" + tabId;
                }
                $(hashTabId).trigger("click");
                $(hashTabId).focus();
            });
        }
    },
    notication: {
        flag: true,
        setFlag: true,
        setNotication: function () {
            if (this.flag) {
                $('body').append("<div id='jqxNotification'><div><span id='jqxNotice' style='font-weight: bold;'></span></div></div>");
                this.flag = false;
            }
        },
        set: function (options) {
            this.setNotication();
            this.setFlag = options == null ? false || this.setFlag : true;
            options = options || {
                width: "auto", position: "top-right", opacity: 0.9,
                autoOpen: false, closeOnClick: true, autoClose: true, template: "info", blink: false
            };
            if (this.setFlag) {
                $("#jqxNotification").jqxNotification(options);
                this.setFlag = false;
                $(".jqx-notification-container").css("z-index", 999999);
                $(".jqx-notification-container").css("top", 55);
                if ($('#jqxNotification').width() >= 650) {
                    $(".jqx-notification-content").css({ "width": "566px", "float": "left" });
                }
                else {
                    $(".jqx-notification-content").css({ "width": "auto", "float": "left" });
                }
                //$(".jqx-notification-container").css({ "top": $(window).height() / 2, "right": $(document).width() / 2 - $("#jqxNotification").width() / 2 });
            }
        },
        setStyleSet: function () {
            $("head").append('<script src="/micaweb/Content/jqwidgets/jqxcore.js">');
            $("head").append('<script src="/micaweb/Content/jqwidgets/jqxnotification.js">');
            $("head").append('<link rel="stylesheet" type="text/css" href="/micaweb/Content/jqwidgets/styles/jqx.base.css"/>');
        },
        open: function (template, str) {
            // str : "string"
            // template: info, warning, success, error, mail, time 
            try {
                micaCommon.notication.set();

                if (template) {
                    $("#jqxNotification").jqxNotification({ template: template });
                }
                if (str) {
                    $("#jqxNotice").html(str);
                }
                if ($("#jqxNotification").width() > 650) {
                    micaCommon.notication.set({ width: "650px" });
                } else {
                    micaCommon.notication.set({ width: "auto" });
                }
                $("#jqxNotification").jqxNotification('open');
            } catch (e) {
                micaCommon.notication.setStyleSet();
                micaCommon.notication.open(template, str);
            }
        }
    },
    inputIcon: {
        flag: false,
        thisEl: {},
        htmlSet: function () {
            if (this.flag) { return }
            this.flag = true;
            var div = "";
            div += '<div class="iconBackground" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%; display:none; z-index:999">';
            div += '<div data-plugin="spanMiniSettings" class="span-mini-settings span-settings mini-settings active" style="left: 579.5px; top: 264px; transition: opacity 100ms; opacity: 1;">';
            div += '    <div class="title draggable">                                                                                                                                           ';
            div += '        <div class="kit-button close">                                                                                                                                      ';
            div += '            <i class="icon-main panel-close"></i>                                                                                                                           ';
            div += '        </div>                                                                                                                                                              ';
            //div += '        <div class="label">                                                                                                                                                 ';
            //div += '            <div class="gear sprite-main"></div>Icon Settings                                                                                                               ';
            //div += '        </div>                                                                                                                                                              ';
            div += '    </div>                                                                                                                                                                  ';
            div += '    <div class="kit-panel">                                                                                                                                                 ';
            div += '                                                                                                                                                                            ';
            div += '        <div class="kit-field" style="left: 1px;">                                                                                                                          ';
            div += '                                                                                                                                                                            ';
            div += '                                                                                                                                                                            ';
            div += '            <div data-bind="radioButtons: tabToggle" class="kit-radio-buttons kit-input-control clearfix">                                                                  ';
            div += '                <div data-choice-value="one" title="one" class="kit-button kit-radio-button has-text active">                                                               ';
            div += '                    <i class="sprite-main"></i><span>1</span>                                                                                                               ';
            div += '                </div>                                                                                                                                                      ';
            div += '                <div data-choice-value="two" title="two" class="kit-button kit-radio-button has-text">                                                                      ';
            div += '                    <i class="sprite-main"></i><span>2</span>                                                                                                               ';
            div += '                </div>                                                                                                                                                      ';
            div += '                <div data-choice-value="three" title="three" class="kit-button kit-radio-button has-text">                                                                  ';
            div += '                    <i class="sprite-main"></i><span>3</span>                                                                                                               ';
            div += '                </div>                                                                                                                                                      ';
            div += '                <div data-choice-value="four" title="four" class="kit-button kit-radio-button has-text">                                                                    ';
            div += '                    <i class="sprite-main"></i><span>4</span>                                                                                                               ';
            div += '                </div>                                                                                                                                                      ';
            div += '                <div data-choice-value="five" title="five" class="kit-button kit-radio-button has-text">                                                                    ';
            div += '                    <i class="sprite-main"></i><span>5</span>                                                                                                               ';
            div += '                </div>                                                                                                                                                      ';
            div += '                <div data-choice-value="six" title="six" class="kit-button kit-radio-button has-text">                                                                      ';
            div += '                    <i class="sprite-main"></i><span>6</span>                                                                                                               ';
            div += '                </div>                                                                                                                                                      ';
            div += '                <div data-choice-value="seven" title="seven" class="kit-button kit-radio-button has-text">                                                                  ';
            div += '                    <i class="sprite-main"></i><span>7</span>                                                                                                               ';
            div += '                </div>                                                                                                                                                      ';
            div += '                <div data-choice-value="eight" title="eight" class="kit-button kit-radio-button has-text">                                                                  ';
            div += '                    <i class="sprite-main"></i><span>8</span>                                                                                                               ';
            div += '                </div>                                                                                                                                                      ';
            div += '                                                                                                                                                                            ';
            div += '            </div>                                                                                                                                                          ';
            div += '        </div>                                                                                                                                                              ';
            div += '                                                                                                                                                                            ';
            div += '        <div class="divDialogElements kit-button-group">                                                                                                                    ';
            div += '            <div class="tab-pane" id="one"><center><table><tbody><tr><td class="kit-button kit-input-control"><a href="#" title="fa-adjust"><i class="fa fa-adjust"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-anchor"><i class="fa fa-anchor"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-archive"><i class="fa fa-archive"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-area-chart"><i class="fa fa-area-chart"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-arrows"><i class="fa fa-arrows"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-arrows-h"><i class="fa fa-arrows-h"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-arrows-v"><i class="fa fa-arrows-v"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-asterisk"><i class="fa fa-asterisk"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-at"><i class="fa fa-at"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-automobile"><i class="fa fa-automobile"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-balance-scale"><i class="fa fa-balance-scale"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-ban"><i class="fa fa-ban"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-bank"><i class="fa fa-bank"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-bar-chart"><i class="fa fa-bar-chart"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-bar-chart-o"><i class="fa fa-bar-chart-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-barcode"><i class="fa fa-barcode"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-bars"><i class="fa fa-bars"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-battery-0"><i class="fa fa-battery-0"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-battery-1"><i class="fa fa-battery-1"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-battery-2"><i class="fa fa-battery-2"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-battery-3"><i class="fa fa-battery-3"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-battery-4"><i class="fa fa-battery-4"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-battery-empty"><i class="fa fa-battery-empty"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-battery-full"><i class="fa fa-battery-full"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-battery-half"><i class="fa fa-battery-half"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-battery-quarter"><i class="fa fa-battery-quarter"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-battery-three-quarters"><i class="fa fa-battery-three-quarters"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-bed"><i class="fa fa-bed"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-beer"><i class="fa fa-beer"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-bell"><i class="fa fa-bell"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-bell-o"><i class="fa fa-bell-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-bell-slash"><i class="fa fa-bell-slash"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-bell-slash-o"><i class="fa fa-bell-slash-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-bicycle"><i class="fa fa-bicycle"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-binoculars"><i class="fa fa-binoculars"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-birthday-cake"><i class="fa fa-birthday-cake"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-bluetooth"><i class="fa fa-bluetooth"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-bluetooth-b"><i class="fa fa-bluetooth-b"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-bolt"><i class="fa fa-bolt"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-bomb"><i class="fa fa-bomb"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-book"><i class="fa fa-book"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-bookmark"><i class="fa fa-bookmark"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-bookmark-o"><i class="fa fa-bookmark-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-briefcase"><i class="fa fa-briefcase"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-bug"><i class="fa fa-bug"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-building"><i class="fa fa-building"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-building-o"><i class="fa fa-building-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-bullhorn"><i class="fa fa-bullhorn"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-bullseye"><i class="fa fa-bullseye"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-bus"><i class="fa fa-bus"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-cab"><i class="fa fa-cab"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-calculator"><i class="fa fa-calculator"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-calendar"><i class="fa fa-calendar"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-calendar-check-o"><i class="fa fa-calendar-check-o"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-calendar-minus-o"><i class="fa fa-calendar-minus-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-calendar-o"><i class="fa fa-calendar-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-calendar-plus-o"><i class="fa fa-calendar-plus-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-calendar-times-o"><i class="fa fa-calendar-times-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-camera"><i class="fa fa-camera"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-camera-retro"><i class="fa fa-camera-retro"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-car"><i class="fa fa-car"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-caret-square-o-down"><i class="fa fa-caret-square-o-down"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-caret-square-o-left"><i class="fa fa-caret-square-o-left"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-caret-square-o-right"><i class="fa fa-caret-square-o-right"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-caret-square-o-up"><i class="fa fa-caret-square-o-up"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-cart-arrow-down"><i class="fa fa-cart-arrow-down"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-cart-plus"><i class="fa fa-cart-plus"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-cc"><i class="fa fa-cc"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-certificate"><i class="fa fa-certificate"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-check"><i class="fa fa-check"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-check-circle"><i class="fa fa-check-circle"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-check-circle-o"><i class="fa fa-check-circle-o"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-check-square"><i class="fa fa-check-square"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-check-square-o"><i class="fa fa-check-square-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-child"><i class="fa fa-child"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-circle"><i class="fa fa-circle"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-circle-o"><i class="fa fa-circle-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-circle-o-notch"><i class="fa fa-circle-o-notch"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-circle-thin"><i class="fa fa-circle-thin"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-clock-o"><i class="fa fa-clock-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-clone"><i class="fa fa-clone"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-close"><i class="fa fa-close"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-cloud"><i class="fa fa-cloud"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-cloud-download"><i class="fa fa-cloud-download"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-cloud-upload"><i class="fa fa-cloud-upload"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-code"><i class="fa fa-code"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-code-fork"><i class="fa fa-code-fork"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-coffee"><i class="fa fa-coffee"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-cog"><i class="fa fa-cog"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-cogs"><i class="fa fa-cogs"></i></a></td></tr></tbody></table></center></div><div class="tab-pane" id="two"><center><table><tbody><tr><td class="kit-button kit-input-control"><a href="#" title="fa-comment"><i class="fa fa-comment"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-comment-o"><i class="fa fa-comment-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-commenting"><i class="fa fa-commenting"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-commenting-o"><i class="fa fa-commenting-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-comments"><i class="fa fa-comments"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-comments-o"><i class="fa fa-comments-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-compass"><i class="fa fa-compass"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-copyright"><i class="fa fa-copyright"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-creative-commons"><i class="fa fa-creative-commons"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-credit-card"><i class="fa fa-credit-card"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-credit-card-alt"><i class="fa fa-credit-card-alt"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-crop"><i class="fa fa-crop"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-crosshairs"><i class="fa fa-crosshairs"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-cube"><i class="fa fa-cube"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-cubes"><i class="fa fa-cubes"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-cutlery"><i class="fa fa-cutlery"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-dashboard"><i class="fa fa-dashboard"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-database"><i class="fa fa-database"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-desktop"><i class="fa fa-desktop"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-diamond"><i class="fa fa-diamond"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-dot-circle-o"><i class="fa fa-dot-circle-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-download"><i class="fa fa-download"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-edit"><i class="fa fa-edit"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-ellipsis-h"><i class="fa fa-ellipsis-h"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-ellipsis-v"><i class="fa fa-ellipsis-v"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-envelope"><i class="fa fa-envelope"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-envelope-o"><i class="fa fa-envelope-o"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-envelope-square"><i class="fa fa-envelope-square"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-eraser"><i class="fa fa-eraser"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-exchange"><i class="fa fa-exchange"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-exclamation"><i class="fa fa-exclamation"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-exclamation-circle"><i class="fa fa-exclamation-circle"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-exclamation-triangle"><i class="fa fa-exclamation-triangle"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-external-link"><i class="fa fa-external-link"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-external-link-square"><i class="fa fa-external-link-square"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-eye"><i class="fa fa-eye"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-eye-slash"><i class="fa fa-eye-slash"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-eyedropper"><i class="fa fa-eyedropper"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-fax"><i class="fa fa-fax"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-feed"><i class="fa fa-feed"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-female"><i class="fa fa-female"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-fighter-jet"><i class="fa fa-fighter-jet"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-file-archive-o"><i class="fa fa-file-archive-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-file-audio-o"><i class="fa fa-file-audio-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-file-code-o"><i class="fa fa-file-code-o"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-file-excel-o"><i class="fa fa-file-excel-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-file-image-o"><i class="fa fa-file-image-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-file-movie-o"><i class="fa fa-file-movie-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-file-pdf-o"><i class="fa fa-file-pdf-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-file-photo-o"><i class="fa fa-file-photo-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-file-picture-o"><i class="fa fa-file-picture-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-file-powerpoint-o"><i class="fa fa-file-powerpoint-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-file-sound-o"><i class="fa fa-file-sound-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-file-video-o"><i class="fa fa-file-video-o"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-file-word-o"><i class="fa fa-file-word-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-file-zip-o"><i class="fa fa-file-zip-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-film"><i class="fa fa-film"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-filter"><i class="fa fa-filter"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-fire"><i class="fa fa-fire"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-fire-extinguisher"><i class="fa fa-fire-extinguisher"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-flag"><i class="fa fa-flag"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-flag-checkered"><i class="fa fa-flag-checkered"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-flag-o"><i class="fa fa-flag-o"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-flash"><i class="fa fa-flash"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-flask"><i class="fa fa-flask"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-folder"><i class="fa fa-folder"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-folder-o"><i class="fa fa-folder-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-folder-open"><i class="fa fa-folder-open"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-folder-open-o"><i class="fa fa-folder-open-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-frown-o"><i class="fa fa-frown-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-futbol-o"><i class="fa fa-futbol-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-gamepad"><i class="fa fa-gamepad"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-gavel"><i class="fa fa-gavel"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-gear"><i class="fa fa-gear"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-gears"><i class="fa fa-gears"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-gift"><i class="fa fa-gift"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-glass"><i class="fa fa-glass"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-globe"><i class="fa fa-globe"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-graduation-cap"><i class="fa fa-graduation-cap"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-group"><i class="fa fa-group"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-hand-grab-o"><i class="fa fa-hand-grab-o"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-hand-lizard-o"><i class="fa fa-hand-lizard-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-hand-paper-o"><i class="fa fa-hand-paper-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-hand-peace-o"><i class="fa fa-hand-peace-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-hand-pointer-o"><i class="fa fa-hand-pointer-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-hand-rock-o"><i class="fa fa-hand-rock-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-hand-scissors-o"><i class="fa fa-hand-scissors-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-hand-spock-o"><i class="fa fa-hand-spock-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-hand-stop-o"><i class="fa fa-hand-stop-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-hashtag"><i class="fa fa-hashtag"></i></a></td></tr></tbody></table></center></div><div class="tab-pane" id="three"><center><table><tbody><tr><td class="kit-button kit-input-control"><a href="#" title="fa-hdd-o"><i class="fa fa-hdd-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-headphones"><i class="fa fa-headphones"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-heart"><i class="fa fa-heart"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-heart-o"><i class="fa fa-heart-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-heartbeat"><i class="fa fa-heartbeat"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-history"><i class="fa fa-history"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-home"><i class="fa fa-home"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-hotel"><i class="fa fa-hotel"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-hourglass"><i class="fa fa-hourglass"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-hourglass-1"><i class="fa fa-hourglass-1"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-hourglass-2"><i class="fa fa-hourglass-2"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-hourglass-3"><i class="fa fa-hourglass-3"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-hourglass-end"><i class="fa fa-hourglass-end"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-hourglass-half"><i class="fa fa-hourglass-half"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-hourglass-o"><i class="fa fa-hourglass-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-hourglass-start"><i class="fa fa-hourglass-start"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-i-cursor"><i class="fa fa-i-cursor"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-image"><i class="fa fa-image"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-inbox"><i class="fa fa-inbox"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-industry"><i class="fa fa-industry"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-info"><i class="fa fa-info"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-info-circle"><i class="fa fa-info-circle"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-institution"><i class="fa fa-institution"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-key"><i class="fa fa-key"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-keyboard-o"><i class="fa fa-keyboard-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-language"><i class="fa fa-language"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-laptop"><i class="fa fa-laptop"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-leaf"><i class="fa fa-leaf"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-legal"><i class="fa fa-legal"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-lemon-o"><i class="fa fa-lemon-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-level-down"><i class="fa fa-level-down"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-level-up"><i class="fa fa-level-up"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-life-bouy"><i class="fa fa-life-bouy"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-life-buoy"><i class="fa fa-life-buoy"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-life-ring"><i class="fa fa-life-ring"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-life-saver"><i class="fa fa-life-saver"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-lightbulb-o"><i class="fa fa-lightbulb-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-line-chart"><i class="fa fa-line-chart"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-location-arrow"><i class="fa fa-location-arrow"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-lock"><i class="fa fa-lock"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-magic"><i class="fa fa-magic"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-magnet"><i class="fa fa-magnet"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-mail-forward"><i class="fa fa-mail-forward"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-mail-reply"><i class="fa fa-mail-reply"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-mail-reply-all"><i class="fa fa-mail-reply-all"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-male"><i class="fa fa-male"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-map"><i class="fa fa-map"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-map-marker"><i class="fa fa-map-marker"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-map-o"><i class="fa fa-map-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-map-pin"><i class="fa fa-map-pin"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-map-signs"><i class="fa fa-map-signs"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-meh-o"><i class="fa fa-meh-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-microphone"><i class="fa fa-microphone"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-microphone-slash"><i class="fa fa-microphone-slash"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-minus"><i class="fa fa-minus"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-minus-circle"><i class="fa fa-minus-circle"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-minus-square"><i class="fa fa-minus-square"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-minus-square-o"><i class="fa fa-minus-square-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-mobile"><i class="fa fa-mobile"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-mobile-phone"><i class="fa fa-mobile-phone"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-money"><i class="fa fa-money"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-moon-o"><i class="fa fa-moon-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-mortar-board"><i class="fa fa-mortar-board"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-motorcycle"><i class="fa fa-motorcycle"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-mouse-pointer"><i class="fa fa-mouse-pointer"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-music"><i class="fa fa-music"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-navicon"><i class="fa fa-navicon"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-newspaper-o"><i class="fa fa-newspaper-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-object-group"><i class="fa fa-object-group"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-object-ungroup"><i class="fa fa-object-ungroup"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-paint-brush"><i class="fa fa-paint-brush"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-paper-plane"><i class="fa fa-paper-plane"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-paper-plane-o"><i class="fa fa-paper-plane-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-paw"><i class="fa fa-paw"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-pencil"><i class="fa fa-pencil"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-pencil-square"><i class="fa fa-pencil-square"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-pencil-square-o"><i class="fa fa-pencil-square-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-percent"><i class="fa fa-percent"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-phone"><i class="fa fa-phone"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-phone-square"><i class="fa fa-phone-square"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-photo"><i class="fa fa-photo"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-picture-o"><i class="fa fa-picture-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-pie-chart"><i class="fa fa-pie-chart"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-plane"><i class="fa fa-plane"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-plug"><i class="fa fa-plug"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-plus"><i class="fa fa-plus"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-plus-circle"><i class="fa fa-plus-circle"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-plus-square"><i class="fa fa-plus-square"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-plus-square-o"><i class="fa fa-plus-square-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-power-off"><i class="fa fa-power-off"></i></a></td></tr></tbody></table></center></div><div class="tab-pane" id="four"><center><table><tbody><tr><td class="kit-button kit-input-control"><a href="#" title="fa-print"><i class="fa fa-print"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-puzzle-piece"><i class="fa fa-puzzle-piece"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-qrcode"><i class="fa fa-qrcode"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-question"><i class="fa fa-question"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-question-circle"><i class="fa fa-question-circle"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-quote-left"><i class="fa fa-quote-left"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-quote-right"><i class="fa fa-quote-right"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-random"><i class="fa fa-random"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-recycle"><i class="fa fa-recycle"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-refresh"><i class="fa fa-refresh"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-registered"><i class="fa fa-registered"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-remove"><i class="fa fa-remove"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-reorder"><i class="fa fa-reorder"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-reply"><i class="fa fa-reply"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-reply-all"><i class="fa fa-reply-all"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-retweet"><i class="fa fa-retweet"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-road"><i class="fa fa-road"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-rocket"><i class="fa fa-rocket"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-rss"><i class="fa fa-rss"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-rss-square"><i class="fa fa-rss-square"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-search"><i class="fa fa-search"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-search-minus"><i class="fa fa-search-minus"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-search-plus"><i class="fa fa-search-plus"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-send"><i class="fa fa-send"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-send-o"><i class="fa fa-send-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-server"><i class="fa fa-server"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-share"><i class="fa fa-share"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-share-alt"><i class="fa fa-share-alt"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-share-alt-square"><i class="fa fa-share-alt-square"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-share-square"><i class="fa fa-share-square"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-share-square-o"><i class="fa fa-share-square-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-shield"><i class="fa fa-shield"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-ship"><i class="fa fa-ship"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-shopping-bag"><i class="fa fa-shopping-bag"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-shopping-basket"><i class="fa fa-shopping-basket"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-shopping-cart"><i class="fa fa-shopping-cart"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-sign-in"><i class="fa fa-sign-in"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-sign-out"><i class="fa fa-sign-out"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-signal"><i class="fa fa-signal"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-sitemap"><i class="fa fa-sitemap"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-sliders"><i class="fa fa-sliders"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-smile-o"><i class="fa fa-smile-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-soccer-ball-o"><i class="fa fa-soccer-ball-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-sort"><i class="fa fa-sort"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-sort-alpha-asc"><i class="fa fa-sort-alpha-asc"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-sort-alpha-desc"><i class="fa fa-sort-alpha-desc"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-sort-amount-asc"><i class="fa fa-sort-amount-asc"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-sort-amount-desc"><i class="fa fa-sort-amount-desc"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-sort-asc"><i class="fa fa-sort-asc"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-sort-desc"><i class="fa fa-sort-desc"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-sort-down"><i class="fa fa-sort-down"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-sort-numeric-asc"><i class="fa fa-sort-numeric-asc"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-sort-numeric-desc"><i class="fa fa-sort-numeric-desc"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-sort-up"><i class="fa fa-sort-up"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-space-shuttle"><i class="fa fa-space-shuttle"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-spinner"><i class="fa fa-spinner"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-spoon"><i class="fa fa-spoon"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-square"><i class="fa fa-square"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-square-o"><i class="fa fa-square-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-star"><i class="fa fa-star"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-star-half"><i class="fa fa-star-half"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-star-half-empty"><i class="fa fa-star-half-empty"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-star-half-full"><i class="fa fa-star-half-full"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-star-half-o"><i class="fa fa-star-half-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-star-o"><i class="fa fa-star-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-sticky-note"><i class="fa fa-sticky-note"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-sticky-note-o"><i class="fa fa-sticky-note-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-street-view"><i class="fa fa-street-view"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-suitcase"><i class="fa fa-suitcase"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-sun-o"><i class="fa fa-sun-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-support"><i class="fa fa-support"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-tablet"><i class="fa fa-tablet"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-tachometer"><i class="fa fa-tachometer"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-tag"><i class="fa fa-tag"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-tags"><i class="fa fa-tags"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-tasks"><i class="fa fa-tasks"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-taxi"><i class="fa fa-taxi"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-television"><i class="fa fa-television"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-terminal"><i class="fa fa-terminal"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-thumb-tack"><i class="fa fa-thumb-tack"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-thumbs-down"><i class="fa fa-thumbs-down"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-thumbs-o-down"><i class="fa fa-thumbs-o-down"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-thumbs-o-up"><i class="fa fa-thumbs-o-up"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-thumbs-up"><i class="fa fa-thumbs-up"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-ticket"><i class="fa fa-ticket"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-times"><i class="fa fa-times"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-times-circle"><i class="fa fa-times-circle"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-times-circle-o"><i class="fa fa-times-circle-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-tint"><i class="fa fa-tint"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-toggle-down"><i class="fa fa-toggle-down"></i></a></td></tr></tbody></table></center></div><div class="tab-pane" id="five"><center><table><tbody><tr><td class="kit-button kit-input-control"><a href="#" title="fa-toggle-left"><i class="fa fa-toggle-left"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-toggle-off"><i class="fa fa-toggle-off"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-toggle-on"><i class="fa fa-toggle-on"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-toggle-right"><i class="fa fa-toggle-right"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-toggle-up"><i class="fa fa-toggle-up"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-trademark"><i class="fa fa-trademark"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-trash"><i class="fa fa-trash"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-trash-o"><i class="fa fa-trash-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-tree"><i class="fa fa-tree"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-trophy"><i class="fa fa-trophy"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-truck"><i class="fa fa-truck"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-tty"><i class="fa fa-tty"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-tv"><i class="fa fa-tv"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-umbrella"><i class="fa fa-umbrella"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-university"><i class="fa fa-university"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-unlock"><i class="fa fa-unlock"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-unlock-alt"><i class="fa fa-unlock-alt"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-unsorted"><i class="fa fa-unsorted"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-upload"><i class="fa fa-upload"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-user"><i class="fa fa-user"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-user-plus"><i class="fa fa-user-plus"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-user-secret"><i class="fa fa-user-secret"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-user-times"><i class="fa fa-user-times"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-users"><i class="fa fa-users"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-video-camera"><i class="fa fa-video-camera"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-volume-down"><i class="fa fa-volume-down"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-volume-off"><i class="fa fa-volume-off"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-volume-up"><i class="fa fa-volume-up"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-warning"><i class="fa fa-warning"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-wheelchair"><i class="fa fa-wheelchair"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-wifi"><i class="fa fa-wifi"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-wrench"><i class="fa fa-wrench"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-hand-o-down"><i class="fa fa-hand-o-down"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-hand-o-left"><i class="fa fa-hand-o-left"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-hand-o-right"><i class="fa fa-hand-o-right"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-hand-o-up"><i class="fa fa-hand-o-up"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-ambulance"><i class="fa fa-ambulance"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-subway"><i class="fa fa-subway"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-train"><i class="fa fa-train"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-genderless"><i class="fa fa-genderless"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-intersex"><i class="fa fa-intersex"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-mars"><i class="fa fa-mars"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-mars-double"><i class="fa fa-mars-double"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-mars-stroke"><i class="fa fa-mars-stroke"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-mars-stroke-h"><i class="fa fa-mars-stroke-h"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-mars-stroke-v"><i class="fa fa-mars-stroke-v"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-mercury"><i class="fa fa-mercury"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-neuter"><i class="fa fa-neuter"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-transgender"><i class="fa fa-transgender"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-transgender-alt"><i class="fa fa-transgender-alt"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-venus"><i class="fa fa-venus"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-venus-double"><i class="fa fa-venus-double"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-venus-mars"><i class="fa fa-venus-mars"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-file"><i class="fa fa-file"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-file-o"><i class="fa fa-file-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-file-text"><i class="fa fa-file-text"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-file-text-o"><i class="fa fa-file-text-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-cc-amex"><i class="fa fa-cc-amex"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-cc-diners-club"><i class="fa fa-cc-diners-club"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-cc-discover"><i class="fa fa-cc-discover"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-cc-jcb"><i class="fa fa-cc-jcb"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-cc-mastercard"><i class="fa fa-cc-mastercard"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-cc-paypal"><i class="fa fa-cc-paypal"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-cc-stripe"><i class="fa fa-cc-stripe"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-cc-visa"><i class="fa fa-cc-visa"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-google-wallet"><i class="fa fa-google-wallet"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-paypal"><i class="fa fa-paypal"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-bitcoin"><i class="fa fa-bitcoin"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-btc"><i class="fa fa-btc"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-cny"><i class="fa fa-cny"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-dollar"><i class="fa fa-dollar"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-eur"><i class="fa fa-eur"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-euro"><i class="fa fa-euro"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-gbp"><i class="fa fa-gbp"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-gg"><i class="fa fa-gg"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-gg-circle"><i class="fa fa-gg-circle"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-ils"><i class="fa fa-ils"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-inr"><i class="fa fa-inr"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-jpy"><i class="fa fa-jpy"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-krw"><i class="fa fa-krw"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-rmb"><i class="fa fa-rmb"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-rouble"><i class="fa fa-rouble"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-rub"><i class="fa fa-rub"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-ruble"><i class="fa fa-ruble"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-rupee"><i class="fa fa-rupee"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-shekel"><i class="fa fa-shekel"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-sheqel"><i class="fa fa-sheqel"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-try"><i class="fa fa-try"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-turkish-lira"><i class="fa fa-turkish-lira"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-usd"><i class="fa fa-usd"></i></a></td></tr></tbody></table></center></div><div class="tab-pane" id="six"><center><table><tbody><tr><td class="kit-button kit-input-control"><a href="#" title="fa-won"><i class="fa fa-won"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-yen"><i class="fa fa-yen"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-align-center"><i class="fa fa-align-center"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-align-justify"><i class="fa fa-align-justify"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-align-left"><i class="fa fa-align-left"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-align-right"><i class="fa fa-align-right"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-bold"><i class="fa fa-bold"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-chain"><i class="fa fa-chain"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-chain-broken"><i class="fa fa-chain-broken"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-clipboard"><i class="fa fa-clipboard"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-columns"><i class="fa fa-columns"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-copy"><i class="fa fa-copy"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-cut"><i class="fa fa-cut"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-dedent"><i class="fa fa-dedent"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-files-o"><i class="fa fa-files-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-floppy-o"><i class="fa fa-floppy-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-font"><i class="fa fa-font"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-header"><i class="fa fa-header"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-indent"><i class="fa fa-indent"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-italic"><i class="fa fa-italic"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-link"><i class="fa fa-link"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-list"><i class="fa fa-list"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-list-alt"><i class="fa fa-list-alt"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-list-ol"><i class="fa fa-list-ol"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-list-ul"><i class="fa fa-list-ul"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-outdent"><i class="fa fa-outdent"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-paperclip"><i class="fa fa-paperclip"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-paragraph"><i class="fa fa-paragraph"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-paste"><i class="fa fa-paste"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-repeat"><i class="fa fa-repeat"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-rotate-left"><i class="fa fa-rotate-left"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-rotate-right"><i class="fa fa-rotate-right"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-save"><i class="fa fa-save"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-scissors"><i class="fa fa-scissors"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-strikethrough"><i class="fa fa-strikethrough"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-subscript"><i class="fa fa-subscript"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-superscript"><i class="fa fa-superscript"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-table"><i class="fa fa-table"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-text-height"><i class="fa fa-text-height"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-text-width"><i class="fa fa-text-width"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-th"><i class="fa fa-th"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-th-large"><i class="fa fa-th-large"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-th-list"><i class="fa fa-th-list"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-underline"><i class="fa fa-underline"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-undo"><i class="fa fa-undo"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-unlink"><i class="fa fa-unlink"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-angle-double-down"><i class="fa fa-angle-double-down"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-angle-double-left"><i class="fa fa-angle-double-left"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-angle-double-right"><i class="fa fa-angle-double-right"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-angle-double-up"><i class="fa fa-angle-double-up"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-angle-down"><i class="fa fa-angle-down"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-angle-left"><i class="fa fa-angle-left"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-angle-right"><i class="fa fa-angle-right"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-angle-up"><i class="fa fa-angle-up"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-arrow-circle-down"><i class="fa fa-arrow-circle-down"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-arrow-circle-left"><i class="fa fa-arrow-circle-left"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-arrow-circle-o-down"><i class="fa fa-arrow-circle-o-down"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-arrow-circle-o-left"><i class="fa fa-arrow-circle-o-left"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-arrow-circle-o-right"><i class="fa fa-arrow-circle-o-right"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-arrow-circle-o-up"><i class="fa fa-arrow-circle-o-up"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-arrow-circle-right"><i class="fa fa-arrow-circle-right"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-arrow-circle-up"><i class="fa fa-arrow-circle-up"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-arrow-down"><i class="fa fa-arrow-down"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-arrow-left"><i class="fa fa-arrow-left"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-arrow-right"><i class="fa fa-arrow-right"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-arrow-up"><i class="fa fa-arrow-up"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-arrows-alt"><i class="fa fa-arrows-alt"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-caret-down"><i class="fa fa-caret-down"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-caret-left"><i class="fa fa-caret-left"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-caret-right"><i class="fa fa-caret-right"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-caret-up"><i class="fa fa-caret-up"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-chevron-circle-down"><i class="fa fa-chevron-circle-down"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-chevron-circle-left"><i class="fa fa-chevron-circle-left"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-chevron-circle-right"><i class="fa fa-chevron-circle-right"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-chevron-circle-up"><i class="fa fa-chevron-circle-up"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-chevron-down"><i class="fa fa-chevron-down"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-chevron-left"><i class="fa fa-chevron-left"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-chevron-right"><i class="fa fa-chevron-right"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-chevron-up"><i class="fa fa-chevron-up"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-long-arrow-down"><i class="fa fa-long-arrow-down"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-long-arrow-left"><i class="fa fa-long-arrow-left"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-long-arrow-right"><i class="fa fa-long-arrow-right"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-long-arrow-up"><i class="fa fa-long-arrow-up"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-backward"><i class="fa fa-backward"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-compress"><i class="fa fa-compress"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-eject"><i class="fa fa-eject"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-expand"><i class="fa fa-expand"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-fast-backward"><i class="fa fa-fast-backward"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-fast-forward"><i class="fa fa-fast-forward"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-forward"><i class="fa fa-forward"></i></a></td></tr></tbody></table></center></div><div class="tab-pane" id="seven"><center><table><tbody><tr><td class="kit-button kit-input-control"><a href="#" title="fa-pause"><i class="fa fa-pause"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-pause-circle"><i class="fa fa-pause-circle"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-pause-circle-o"><i class="fa fa-pause-circle-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-play"><i class="fa fa-play"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-play-circle"><i class="fa fa-play-circle"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-play-circle-o"><i class="fa fa-play-circle-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-step-backward"><i class="fa fa-step-backward"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-step-forward"><i class="fa fa-step-forward"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-stop"><i class="fa fa-stop"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-stop-circle"><i class="fa fa-stop-circle"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-stop-circle-o"><i class="fa fa-stop-circle-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-youtube-play"><i class="fa fa-youtube-play"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-500px"><i class="fa fa-500px"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-adn"><i class="fa fa-adn"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-amazon"><i class="fa fa-amazon"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-android"><i class="fa fa-android"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-angellist"><i class="fa fa-angellist"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-apple"><i class="fa fa-apple"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-behance"><i class="fa fa-behance"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-behance-square"><i class="fa fa-behance-square"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-bitbucket"><i class="fa fa-bitbucket"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-bitbucket-square"><i class="fa fa-bitbucket-square"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-black-tie"><i class="fa fa-black-tie"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-buysellads"><i class="fa fa-buysellads"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-chrome"><i class="fa fa-chrome"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-codepen"><i class="fa fa-codepen"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-codiepie"><i class="fa fa-codiepie"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-connectdevelop"><i class="fa fa-connectdevelop"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-contao"><i class="fa fa-contao"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-css3"><i class="fa fa-css3"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-dashcube"><i class="fa fa-dashcube"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-delicious"><i class="fa fa-delicious"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-deviantart"><i class="fa fa-deviantart"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-digg"><i class="fa fa-digg"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-dribbble"><i class="fa fa-dribbble"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-dropbox"><i class="fa fa-dropbox"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-drupal"><i class="fa fa-drupal"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-edge"><i class="fa fa-edge"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-empire"><i class="fa fa-empire"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-expeditedssl"><i class="fa fa-expeditedssl"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-facebook"><i class="fa fa-facebook"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-facebook-f"><i class="fa fa-facebook-f"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-facebook-official"><i class="fa fa-facebook-official"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-facebook-square"><i class="fa fa-facebook-square"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-firefox"><i class="fa fa-firefox"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-flickr"><i class="fa fa-flickr"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-fonticons"><i class="fa fa-fonticons"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-fort-awesome"><i class="fa fa-fort-awesome"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-forumbee"><i class="fa fa-forumbee"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-foursquare"><i class="fa fa-foursquare"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-ge"><i class="fa fa-ge"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-get-pocket"><i class="fa fa-get-pocket"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-git"><i class="fa fa-git"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-git-square"><i class="fa fa-git-square"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-github"><i class="fa fa-github"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-github-alt"><i class="fa fa-github-alt"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-github-square"><i class="fa fa-github-square"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-gittip"><i class="fa fa-gittip"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-google"><i class="fa fa-google"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-google-plus"><i class="fa fa-google-plus"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-google-plus-square"><i class="fa fa-google-plus-square"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-gratipay"><i class="fa fa-gratipay"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-hacker-news"><i class="fa fa-hacker-news"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-houzz"><i class="fa fa-houzz"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-html5"><i class="fa fa-html5"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-instagram"><i class="fa fa-instagram"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-internet-explorer"><i class="fa fa-internet-explorer"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-ioxhost"><i class="fa fa-ioxhost"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-joomla"><i class="fa fa-joomla"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-jsfiddle"><i class="fa fa-jsfiddle"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-lastfm"><i class="fa fa-lastfm"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-lastfm-square"><i class="fa fa-lastfm-square"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-leanpub"><i class="fa fa-leanpub"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-linkedin"><i class="fa fa-linkedin"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-linkedin-square"><i class="fa fa-linkedin-square"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-linux"><i class="fa fa-linux"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-maxcdn"><i class="fa fa-maxcdn"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-meanpath"><i class="fa fa-meanpath"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-medium"><i class="fa fa-medium"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-mixcloud"><i class="fa fa-mixcloud"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-modx"><i class="fa fa-modx"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-odnoklassniki"><i class="fa fa-odnoklassniki"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-odnoklassniki-square"><i class="fa fa-odnoklassniki-square"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-opencart"><i class="fa fa-opencart"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-openid"><i class="fa fa-openid"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-opera"><i class="fa fa-opera"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-optin-monster"><i class="fa fa-optin-monster"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-pagelines"><i class="fa fa-pagelines"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-pied-piper"><i class="fa fa-pied-piper"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-pied-piper-alt"><i class="fa fa-pied-piper-alt"></i></a></td></tr></tbody></table></center></div><div class="tab-pane" id="eight"><center><table><tbody><tr><td class="kit-button kit-input-control"><a href="#" title="fa-pinterest"><i class="fa fa-pinterest"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-pinterest-p"><i class="fa fa-pinterest-p"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-pinterest-square"><i class="fa fa-pinterest-square"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-product-hunt"><i class="fa fa-product-hunt"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-qq"><i class="fa fa-qq"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-ra"><i class="fa fa-ra"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-rebel"><i class="fa fa-rebel"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-reddit"><i class="fa fa-reddit"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-reddit-alien"><i class="fa fa-reddit-alien"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-reddit-square"><i class="fa fa-reddit-square"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-renren"><i class="fa fa-renren"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-safari"><i class="fa fa-safari"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-scribd"><i class="fa fa-scribd"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-sellsy"><i class="fa fa-sellsy"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-shirtsinbulk"><i class="fa fa-shirtsinbulk"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-simplybuilt"><i class="fa fa-simplybuilt"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-skyatlas"><i class="fa fa-skyatlas"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-skype"><i class="fa fa-skype"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-slack"><i class="fa fa-slack"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-slideshare"><i class="fa fa-slideshare"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-soundcloud"><i class="fa fa-soundcloud"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-spotify"><i class="fa fa-spotify"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-stack-exchange"><i class="fa fa-stack-exchange"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-stack-overflow"><i class="fa fa-stack-overflow"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-steam"><i class="fa fa-steam"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-steam-square"><i class="fa fa-steam-square"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-stumbleupon"><i class="fa fa-stumbleupon"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-stumbleupon-circle"><i class="fa fa-stumbleupon-circle"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-tencent-weibo"><i class="fa fa-tencent-weibo"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-trello"><i class="fa fa-trello"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-tripadvisor"><i class="fa fa-tripadvisor"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-tumblr"><i class="fa fa-tumblr"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-tumblr-square"><i class="fa fa-tumblr-square"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-twitch"><i class="fa fa-twitch"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-twitter"><i class="fa fa-twitter"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-twitter-square"><i class="fa fa-twitter-square"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-usb"><i class="fa fa-usb"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-viacoin"><i class="fa fa-viacoin"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-vimeo"><i class="fa fa-vimeo"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-vimeo-square"><i class="fa fa-vimeo-square"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-vine"><i class="fa fa-vine"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-vk"><i class="fa fa-vk"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-wechat"><i class="fa fa-wechat"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-weibo"><i class="fa fa-weibo"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-weixin"><i class="fa fa-weixin"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-whatsapp"><i class="fa fa-whatsapp"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-wikipedia-w"><i class="fa fa-wikipedia-w"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-windows"><i class="fa fa-windows"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-wordpress"><i class="fa fa-wordpress"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-xing"><i class="fa fa-xing"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-xing-square"><i class="fa fa-xing-square"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-y-combinator"><i class="fa fa-y-combinator"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-y-combinator-square"><i class="fa fa-y-combinator-square"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-yahoo"><i class="fa fa-yahoo"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-yc"><i class="fa fa-yc"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-yc-square"><i class="fa fa-yc-square"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-yelp"><i class="fa fa-yelp"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-youtube"><i class="fa fa-youtube"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-youtube-square"><i class="fa fa-youtube-square"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-h-square"><i class="fa fa-h-square"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-hospital-o"><i class="fa fa-hospital-o"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-medkit"><i class="fa fa-medkit"></i></a></td><td class="kit-button kit-input-control"><a href="#" title="fa-stethoscope"><i class="fa fa-stethoscope"></i></a></td></tr><tr><td class="kit-button kit-input-control"><a href="#" title="fa-user-md"><i class="fa fa-user-md"></i></a></td></tr><tr></tr><tr></tr></tbody></table></center></div>';
            div += '        </div>                                                                                                                                                              ';
            div += '                                                                                                                                                                            ';
            div += '    </div>                                                                                                                                                                  ';
            div += '                                                                                                                                                                            ';
            div += '</div>         ';
            div += '</div>';
            $("body").append(div);

            $("[data-plugin=spanMiniSettings] .tab-pane").on("click", ".kit-button", function (e) {
                e.stopPropagation();

                var value = $(this).children().attr("title");
                if (micaCommon.inputIcon.thisEl.val() == $(this).children().attr("title")) {
                    value = "";
                }
                micaCommon.inputIcon.thisEl.val(value).trigger("valChange");
                micaCommon.inputIcon.thisEl.trigger("blur");
                micaCommon.inputIcon.thisEl.trigger("change");
                $("#inputIconView_" + micaCommon.inputIcon.thisEl.attr("id")).css("background-color", "#F8F8F8");
                $(".iconBackground").hide();
            });

            $("div[data-plugin=spanMiniSettings] .kit-button.close").on("click", function (e) {
                e.stopPropagation();
                $("#inputIconView_" + micaCommon.inputIcon.thisEl.attr("id")).css("background-color", "#F8F8F8");
                $(".iconBackground").hide();
            });

            $("div[data-plugin=spanMiniSettings]").on("click", "[data-choice-value]", function (e) {
                e.stopPropagation();
                $(".tab-pane").hide();
                $("#" + $(this).attr("title")).show();
                $("div[data-plugin=spanMiniSettings] [data-choice-value]").removeClass("active");
                $(this).addClass("active");
            });
            $(".iconBackground").on("click", function (e) {
                if ($(e.target).attr("data-plugin") == "spanMiniSettings" || $(e.target).hasClass("title")) {
                    return;
                }
                $("#inputIconView_" + micaCommon.inputIcon.thisEl.attr("id")).css("background-color", "#F8F8F8");
                $(".iconBackground").hide();

            });
        },
        iconViewSet: function (el) {
            el = typeof el == "string" ? $(el) : el;
            if (!el.hasClass("w-input")) {
                el.addClass("w-input");
            }
            var iconView = el.parent().find(".inputIconView");
            var span = "";
            if (el.attr("id") == null) {
                el.attr("id", micaCommon.guid());
            }
            span += '<span id="inputIconView_' + el.attr("id") + '"';
            span += 'class="inputIconView jqx-icon-arrow-down fa" style="';
            span += 'cursor: pointer;                ';
            span += 'position: absolute;                ';
            span += 'margin-left: -25px;                ';
            span += 'margin-top: 1px;                   ';
            span += 'background-color: #F8F8F8;         ';
            span += 'height: 24px;                      ';
            span += 'width: 24px;                       ';
            span += 'border-left: solid 1px #C7C7C7;    ';
            span += 'text-align: center;                ';
            span += 'font-size: 15px;                   ';
            span += 'padding-top: 5px;                  ';
            span += 'color: grey;                       ';
            span += '">';
            if ($("#inputIconView_" + el.attr("id")).length < 1) {
                el.after(span);
                el.attr("readOnly", true);
                el.css("cursor", "pointer");
                el.css("background-color", "white");
            }
        },
        val: function (el, value) {
            el = typeof el == "string" ? $(el) : el;
            if (value == null) {
                return el.val();
            } else {
                el.val(value).trigger("valChange");
            }
        },
        set: function (el) {
            el = typeof el == "string" ? $(el) : el;
            this.htmlSet();
            this.iconViewSet(el);
            el.on("click", function (e) {
                $("div[data-plugin=spanMiniSettings]").css("left", $(this).offset().left);
                var top = 0;
                if ($(this).offset().top + 30 + 303 > $(window).height()) {
                    top = $(this).offset().top - 5 - 303;
                    if ($(this).offset().top < 335) {
                        top = $(this).offset().top + 30;
                    }
                } else {
                    top = $(this).offset().top + 30;
                }
                $("div[data-plugin=spanMiniSettings]").css("top", top);
                $("div[data-plugin=spanMiniSettings] .kit-button.active").removeClass("active");
                $(".tab-pane").hide();
                if ($(this).val()) {
                    $("div[data-plugin=spanMiniSettings] .kit-button a[title=" + $(this).val() + "]").parent().addClass("active");
                    var id = $("div[data-plugin=spanMiniSettings] .kit-button a[title=" + $(this).val() + "]").parents(".tab-pane").attr("id");
                    $("div[data-plugin=spanMiniSettings] [data-choice-value=" + id).addClass("active");
                    $("#" + id).show();
                } else {
                    //$("div[data-plugin=spanMiniSettings] .kit-button a[title=" + $(this).val() + "]").parent().addClass("active");
                    $("div[data-plugin=spanMiniSettings] [data-choice-value=" + "one").addClass("active");
                    $("#one").show();
                }
                micaCommon.inputIcon.thisEl = $(this);
                $("#inputIconView_" + micaCommon.inputIcon.thisEl.attr("id")).css("background-color", "#e8e8e8");
                $(".iconBackground").show();
            });
            el.on("valChange", function (e) {
                var iconView = $(this).parent().find("#inputIconView_" + $(this).attr("id"));
                iconView.removeClass();
                iconView.addClass("inputIconView");
                iconView.addClass("fa");
                if ($(this).val().length < 1) {
                    iconView.addClass("jqx-icon-arrow-down");
                }
                iconView.addClass($(this).val());
            });
            el.hover(function (e) {
                $("#inputIconView_" + $(this).attr("id")).css("background-color", "#e8e8e8");
            }, function (e) {
                if ($(".iconBackground").css("display") == "none") {
                    $("#inputIconView_" + $(this).attr("id")).css("background-color", "#F8F8F8");
                }
            });
            $("#inputIconView_" + el.attr("id")).on("click", function (e) {
                el.trigger("click");
                $(this).css("background-color", "#e8e8e8");
            });
            $("#inputIconView_" + el.attr("id")).hover(function (e) {
                $(this).css("background-color", "#e8e8e8");
            }, function (e) {
                if ($(".iconBackground").css("display") == "none") {
                    $(this).css("background-color", "#F8F8F8");
                }
            });
            $(".iconBackground").hide();
        }
    },
    guid: function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    },
    multiLanguage: {
        set: function (extraData) {
            var langObj;
            if ("undefined" != typeof extraData && extraData) {
                langObj = extraData;
            }
            if ("undefined" != typeof multiBuff && multiBuff) {
                langObj = langObj || {};
                var multiBuffKeys = Object.keys(multiBuff);
                var nationalKeys = Object.keys(national);

                $(multiBuffKeys).each(function (mIdx, mItem) {
                    var nationalObj = {};
                    $(nationalKeys).each(function (nIdx, nItem) {
                        nationalObj[nItem] = multiBuff[mItem][nIdx];
                    });
                    langObj[mItem] = nationalObj;
                });
            }

            localStorage.setItem("MULTI_LANGUAGE_DATA", langObj ? JSON.stringify(langObj) : "");
        },
        get: function () {
            //return localStorage.getItem("MULTI_LANGUAGE_DATA") ? JSON.parse(localStorage.getItem("MULTI_LANGUAGE_DATA")) : null;
            localStorage.getItem("MULTI_LANGUAGE_DATA") ? micaCommon.langSet() : null;

            return micaCommon.lang.list ? micaCommon.lang.list : null;
        },
        reload: function (url, extraData) {
            $.ajax({
                url: url ? url : "/micaweb/Content/js/regional.js",
                dataType: "script",
                cache: false,
                async: false,
                success: function (data, textStatus, jqxhr) {
                    micaCommon.multiLanguage.set(extraData);
                }
            });
            return localStorage.getItem("MULTI_LANGUAGE_DATA") ? JSON.parse(localStorage.getItem("MULTI_LANGUAGE_DATA")) : null;
        },
        lang: function (key, langType) {
            if (typeof langType === "undefined") {
                langType = sessionStorage.getItem("LANGUAGE") ? sessionStorage.getItem("LANGUAGE") : $('html').attr('data-language').toUpperCase();
            }
            if (JSON.parse(localStorage.MULTI_LANGUAGE_DATA)[key] == null) {
                return key;
            } else {
                return JSON.parse(localStorage.MULTI_LANGUAGE_DATA)[key][langType.toUpperCase()];
            }

        },
        apply: function (el, childFlag) {
            el = typeof el == "string" ? $(el) : el;
            if (!el.length) return;
            el.each(function (idx, item) {
                micaCommon.multiLanguage.applyBulid(idx, item);
                if (!(!childFlag)) {
                    var els = $(item).find('[multi-lang], [placeholder], [title]');
                    if (els.length > 1) {
                        els.each(micaCommon.multiLanguage.applyBulid);
                    }
                }
            });
        },
        applyBulid: function (i, el) {
            var EL = $(el);
            var codeId = "";
            if (EL.attr('multi-lang')) {
                codeId = EL.attr('multi-lang');
                if (!(!MULTI_LANGUAGE_DATA)) {
                    var value = MULTI_LANGUAGE_DATA[codeId] ? MULTI_LANGUAGE_DATA[codeId][MULTI_LANGUAGE_CODE] ? MULTI_LANGUAGE_DATA[codeId][MULTI_LANGUAGE_CODE] : undefined : undefined;
                    codeId && typeof (value) != undefined && EL.html(value);
                }
            }
            if (EL.attr('placeholder')) {
                codeId = EL.attr('placeholder');
                if (!(!MULTI_LANGUAGE_DATA)) {
                    var value = MULTI_LANGUAGE_DATA[codeId] ? MULTI_LANGUAGE_DATA[codeId][MULTI_LANGUAGE_CODE] ? MULTI_LANGUAGE_DATA[codeId][MULTI_LANGUAGE_CODE] : undefined : undefined;
                    codeId && typeof (value) != undefined && EL.attr("placeholder", value);
                }
            }
            if (EL.attr('title')) {
                codeId = EL.attr('title');
                if (!(!MULTI_LANGUAGE_DATA)) {
                    var value = MULTI_LANGUAGE_DATA[codeId] ? MULTI_LANGUAGE_DATA[codeId][MULTI_LANGUAGE_CODE] ? MULTI_LANGUAGE_DATA[codeId][MULTI_LANGUAGE_CODE] : undefined : undefined;
                    codeId && typeof (value) != undefined && EL.attr("title", value);
                }
            }
        }
    },
    fileInput: {
        fileOptions: {},
        set: function (el, options) {
            // options{} _ default : url, size, success, fail, accept, 
            //           _ edit : fileName, fileUrl 
            el = typeof el == "string" ? $(el) : el;
            options = options || {};
            options.size = micaCommon.fncS.byteUnit(options.size);
            el.uniqueId();

            micaCommon.fileInput.fileOptions[el.attr("id")] = {};
            micaCommon.fileInput.fileOptions[el.attr("id")] = options || {};

            if (options.fileName != null) {
                options.data = options.fileUrl;
            }
            //fileinput-exists
            // <a href="#" class="input-group-addon btn btn-primary fileinput-download" data-dismiss="fileinput">Download</a>
            var html = "";
            if (options.fileName) {
                html += '<div class="fileinput fileinput-exists input-group" data-provides="fileinput">';
            } else {
                html += '<div class="fileinput fileinput-new input-group" data-provides="fileinput">';
            }

            html += '  <div class="form-control" data-trigger="fileinput" style="text-overflow: ellipsis; overflow: hidden; height:#{height};">' +
            '<div class="progress bar" style="display:none; background-color: rgba(120, 211, 255, 0.15);position: absolute;z-index: 999999;width: 100%;height: 100%;margin-left: -12px;margin-top: -7px;">' +
            '</div>' +
            '<div class="progress" style="display:none; background-color: rgba(120, 211, 255, 0);position: absolute;z-index: 999999;width: 100%;height: 100%;margin-left: -12px;margin-top: -7px;">' +
            '<div class="num" style="float:right; padding:8px; padding-top:#{paddingTop}">100%</div>' +
            '</div>' +
            '<div class="progressError" style="display:none; background-color: rgba(255, 120, 120, 0.15);position: absolute;z-index: 99999999;width: 100%;height: 100%;margin-left: -12px;margin-top: -7px;">' +
            '<div class="error" style="float:right; padding:8px;padding-top:#{paddingTop}">error</div>' +
            '</div>' +
            '<i class="glyphicon fa fa-file fileinput-exists"></i> <span class="fileinput-filename" style="padding-top:#{fileNmaePaddingTop}"></span></div>                             ' +
            '  <span class="input-group-addon btn btn-default btn-file"><span class="fileinput-new" multi-lang="L_SelectFile">Select file</span><span class="fileinput-exists" multi-lang="L_Change">Change</span><input type="file" name="..." accept="#{accept}"></span>' +
            '  <a href="#" class="input-group-addon btn btn-warning fileinput-exists" data-dismiss="fileinput" multi-lang="L_Remove">Remove</a>                                                                              ';
            html += '<a href="#" class="input-group-addon btn btn-primary fileinput-download" data-dismiss="fileinput" multi-lang="L_Download">Download</a>';
            html += '</div>            ';
            var accept = options.accept || "";
            var acceptStr = "";
            if (typeof accept == "string") {
                acceptStr = "." + accept;
            } else {
                $.each(accept, function (i, v) {
                    acceptStr += "." + v + ",";
                });
            }
            var height = el.height();
            if (height < 1) {
                height = 26;
            }
            html = html.replace(/#{accept}/, acceptStr);
            html = html.replace(/#{height}/gi, height + "px");
            html = html.replace(/#{paddingTop}/gi, height / 2 - 9 + "px");
            html = html.replace(/#{fileNmaePaddingTop}/gi, height / 2 - 9 - 7 + "px");
            el.html(html);

            // 버튼 다국어 처리
            micaCommon.multiLanguage.apply(el, true);

            if (options.fileName) {
                el.find(".fileinput-filename").html(options.fileName);
                el.find(".fileinput-download").show();
                if (options.downloadFn) {
                    el.find(".fileinput-download").attr("href", "#");
                    el.find(".fileinput-download").on("click", function (e) {
                        e.stopPropagation();
                        options.downloadFn(fileUrl);
                    });
                } else {
                    el.find(".fileinput-download").attr("href", options.fileUrl);
                    el.find(".fileinput-download").on("click", function (e) {
                        e.stopPropagation();
                    });
                }
            } else {
                el.find(".fileinput-download").hide();
            }
            el.find("input[type=file]").on("change", function (e) {
                //micaCommon.fileInput.fileOptions[el.attr("id")]
                el.find(".fileinput-download").hide();
                var options = micaCommon.fileInput.fileOptions[el.attr("id")];
                var progress = $(this).parent().parent().find(".progress");
                var progressBar = $(progress[0]);
                var progressNum = progress.find(".num");
                var progressError = $(this).parent().parent().find(".progressError");
                var progressErrorMessage = progressError.find(".error");
                progressBar.width("0%");
                progressNum.html("0%");
                progressErrorMessage.html("Error");
                progressError.hide();
                progress.show();
                //$(window).on("resize", progressError, function () {
                //    console.log($(this));
                //});
                var fileName = options.data ? options.data.DATASET.FILE_URL : null; //FILE_URL
                var formData = new FormData();
                var file = $(this)[0].files[0];

                if (file) {
                    if (options.accept) {
                        var acceptObj = micaCommon.fncS.keyValueSet({ data: options.accept, toLowerCase: true });
                        if (acceptObj[(file.name.substr(file.name.lastIndexOf(".") + 1)).toLowerCase()] == null) {
                            progress.hide();
                            if (progressError.width() > 450) {
                                progressErrorMessage.html("Error File Extension");
                            } else {
                                progressErrorMessage.html("");
                            }
                            progressError.show();
                            return;
                        }
                    }
                    if (-1 < options.size && options.size < file.size) {
                        progress.hide();
                        if (progressError.width() > 450) {
                            progressErrorMessage.html("Error Size : " + micaCommon.fncS.maxUnitByte(file.size) + " / " + micaCommon.fncS.maxUnitByte(options.size));
                        } else {
                            progressErrorMessage.html("");
                        }
                        progressError.show();
                        return;
                    }
                    formData.append("attachFile", file);
                }

                if (fileName) {
                    formData.append("deleteFile", fileName);
                }
                $.ajax({
                    url: options.url,
                    data: formData,
                    processData: false,
                    contentType: false,
                    type: 'POST',
                    xhr: function () {
                        var xhr = new window.XMLHttpRequest();
                        //Upload progress
                        xhr.upload.addEventListener("progress", function (evt) {
                            if (evt.lengthComputable) {
                                var percentComplete = evt.loaded / evt.total;
                                //Do something with download progress
                                percentComplete = Math.floor(percentComplete * 100) + "%";
                                progressBar.width(percentComplete);
                                progressNum.html(percentComplete);
                            }
                        }, false);
                        //Download progress
                        xhr.addEventListener("progress", function (evt) {
                            if (evt.lengthComputable) {
                                var percentComplete = evt.loaded / evt.total;
                                //Do something with download progress
                                percentComplete = Math.floor(percentComplete * 100) + "%";
                                progressBar.width(percentComplete);
                                progressNum.html(percentComplete);
                            }
                        }, false);
                        return xhr;
                    },
                    success: function (data) {
                        progress.hide();
                        micaCommon.fileInput.fileOptions[el.attr("id")].data = data;
                        micaCommon.fileInput.excute(options.success, data);
                    },
                    error: function (data) {
                        progress.hide();
                        progressError.show();
                        micaCommon.fileInput.excute(options.error, data);
                    }
                });

            });
        },
        edit: function (el, options) {
            el = $(el);
            if (options.fileName) {
                el.find(".fileinput").removeClass("fileinput-new");
                el.find(".fileinput").addClass("fileinput-exists");
                el.find(".fileinput-filename").html(options.fileName);
                el.find(".fileinput-download").show();
                el.find(".fileinput-download").off("click");
                if (options.downloadFn) {
                    el.find(".fileinput-download").attr("href", "#");
                    el.find(".fileinput-download").on("click", function (e) {
                        e.stopPropagation();
                        options.downloadFn(options.fileUrl);
                    });
                } else {
                    el.find(".fileinput-download").attr("href", options.fileUrl);
                    el.find(".fileinput-download").on("click", function (e) {
                        e.stopPropagation();
                    });
                }
            } else {
                el.find(".fileinput-download").hide();
            }
        },
        excute: function (fnc, data) {
            if (fnc) {
                fnc(data);
            }
        },
        get: function (el) {
            el = typeof el == "string" ? $(el) : el;
            return micaCommon.fileInput.fileOptions[el.attr("id")];
        }
    },
    checkBox: {
        set: function (el, options, callBack) {
            //options : url, textName, valueName, hierarchy
            //options : local[] = [{text:"", value:""}]
            el = $(el);
            options = options || {};
            callBack = callBack || {};
            el.uniqueId();
            el.html("");
            //micaCommon.checkBox.htmlSet(el, options);

            micaCommon.fncS.initialized(el, false);
            if (options.url) {

                var mtype = options.mtype || "POST";
                if (mtype == "get") {
                    $.get(options.url, data).done(function (data) {
                        if (typeof (data) == "string") {
                            data = JSON.parse(data)
                        }
                        micaCommon.fncS.callBackExec(callBack.before, data, options);
                        var dataObj = micaCommon.fncS.hierarchyReturn(data, options.rowsName);
                        options.local = micaCommon.fncS.keyValueSet({ data: dataObj, key: options.valueName });
                        micaCommon.checkBox.htmlSet(el, options);
                        micaCommon.fncS.callBackExec(callBack.after, data, options);
                    });
                } else {
                    ajaxService(data, options.url, null, mtype).done(function (data) {
                        micaCommon.fncS.callBackExec(callBack.before, data, options);
                        var dataObj = micaCommon.fncS.hierarchyReturn(data, options.rowsName);
                        if (dataObj == null) {
                            if (callBack.exception) {
                                micaCommon.fncS.callBackExec(callBack.exception, data, options);
                            } else {
                                micaCommon.notication.open("warning", "No Data");
                            }
                            return;
                        }
                        options.local = micaCommon.fncS.keyValueSet({ data: dataObj, key: options.valueName });
                        micaCommon.checkBox.htmlSet(el, options);
                        micaCommon.fncS.callBackExec(callBack.after, data, options);
                    });
                }
                //(data, url, successFn, method, errorFn, options)
            } else {

                var dataObj = options.local;
                data = options.local;
                if (dataObj != null) {
                    micaCommon.fncS.callBackExec(callBack.before, data, options);
                    micaCommon.checkBox.htmlSet(el, options);
                    micaCommon.fncS.callBackExec(callBack.after, data, options);
                }
            }
        },
        htmlSet: function (el, options) {
            var textName = options.textName || "text";
            var valueName = options.valueName || "value";
            var name = el.attr("name") || el.attr("id");
            var input = '<input name="check_#{name}" data-name="#{name}" value="#{value}" type="checkbox" class="w-checkbox-input">';
            var label = '<label for="#{id}" class="w-form-label">#{text}</label> ';
            //micaCommon.fncS.hierarchyReturn(local, )
            var data = options.local;
            for (var i = 0; i < data.length; i++) {
                var datai = data[i];
                var text = datai[textName];
                var value = datai[textName];
                var $input = $(input.replace(/#{name}/gi, name).replace(/#{value}/gi, value));
                $input.uniqueId();
                var id = $input.attr("id");
                var $label = $(label.replace(/#{id}/gi, id).replace(/#{text}/gi, text));

                var $div = $('<div class="checkboxgroup">');
                $div.append($input);
                $div.append($label);
                el.append($div);
            }
            micaCommon.fncS.initialized(el, true);
        },
        initialized: function (el) {
            return micaCommon.fncS.initialized(el);
        }
    },
    radioButton: {
        set: function (el, options, callBack) {
            //options : url, textName, valueName, hierarchy
            //options : local[] = [{text:"", value:""}]
            el = $(el);
            options = options || {};
            callBack = callBack || {};
            el.uniqueId();
            el.html("");
            micaCommon.fncS.initialized(el, false);
            if (options.url) {

                var mtype = options.mtype || "POST";
                if (mtype == "get") {
                    $.get(options.url, data).done(function (data) {
                        if (typeof (data) == "string") {
                            data = JSON.parse(data)
                        }
                        micaCommon.fncS.callBackExec(callBack.before, data, options);
                        var dataObj = micaCommon.fncS.hierarchyReturn(data, options.rowsName);
                        options.local = micaCommon.fncS.keyValueSet({ data: dataObj, key: options.valueName });
                        micaCommon.radioButton.htmlSet(el, options);
                        micaCommon.fncS.callBackExec(callBack.after, data, options);
                    });
                } else {
                    ajaxService(data, options.url, null, mtype).done(function (data) {
                        micaCommon.fncS.callBackExec(callBack.before, data, options);
                        var dataObj = micaCommon.fncS.hierarchyReturn(data, options.rowsName);
                        if (dataObj == null) {
                            if (callBack.exception) {
                                micaCommon.fncS.callBackExec(callBack.exception, data, options);
                            } else {
                                micaCommon.notication.open("warning", "No Data");
                            }
                            return;
                        }
                        options.local = micaCommon.fncS.keyValueSet({ data: dataObj, key: options.valueName });
                        micaCommon.radioButton.htmlSet(el, options);
                        micaCommon.fncS.callBackExec(callBack.after, data, options);
                    });
                }
                //(data, url, successFn, method, errorFn, options)
            } else {

                var dataObj = options.local;
                data = options.local;
                if (dataObj != null) {
                    micaCommon.fncS.callBackExec(callBack.before, data, options);
                    micaCommon.radioButton.htmlSet(el, options);
                    micaCommon.fncS.callBackExec(callBack.after, data, options);
                }
            }

        },
        htmlSet: function (el, options) {
            var textName = options.textName || "text";
            var valueName = options.valueName || "value";
            var name = el.attr("name") || el.attr("id");
            //<div class="w-radio"><input class="w-radio-input" id="radio" name="radio" value="Radio" data-name="Radio" type="radio"><label class="w-form-label" for="radio">Radio</label></div>
            var input = '<input name="check_#{name}" data-name="#{name}" value="#{value}" type="radio" class="w-radio-input">';
            var label = '<label for="#{id}" class="w-form-label">#{text}</label> ';
            //micaCommon.fncS.hierarchyReturn(local, )
            var data = options.local;
            for (var i = 0; i < data.length; i++) {
                var datai = data[i];
                var text = datai[textName];
                var value = datai[valueName];
                var $input = $(input.replace(/#{name}/gi, name).replace(/#{value}/gi, value));
                $input.uniqueId();
                var id = $input.attr("id");
                var $label = $(label.replace(/#{id}/gi, id).replace(/#{text}/gi, text));

                var $div = $('<div class="checkboxgroup">');
                $div.append($input);
                $div.append($label);
                el.append($div);
            }
            micaCommon.fncS.initialized(el, true);
        },
        initialized: function (el) {
            return micaCommon.fncS.initialized(el);
        }
    },
    autoHeightResize: function (els, options) {
        // options = {minHeight}

        // micaCommon.autoHeightResize.els = {elID : options} // dev

        //    	micaCommon.autoHeightResize.els = {}
        els = $(els);
        if (els.length < 1) {
            return;
        }

        if (micaCommon.autoHeightResize.obj == null) {
            micaCommon.autoHeightResize.obj = {};
        }

        //if (els.length < 1 || els.parents(".w-row.jqx-splitter").length > 0) {
        //    return;
        //}
        micaCommon.autoHeightResize.els = micaCommon.autoHeightResize.els || {};
        for (var i = 0; i < els.length; i++) {
            var el = $(els[i]);
            el.uniqueId();
            if (micaCommon.autoHeightResize.els[el.attr("id")] == null) {
                options.duplication = false;
            }
            micaCommon.autoHeightResize.els[el.attr("id")] = options;
            if (micaCommon.autoHeightResize.els[el.attr("id")].duplication) {
                return;
            }
        }
        options = options || {};
        micaCommon.autoHeightResize.num = 0;
        if (micaCommon.autoHeightResize.resizeFlag) {

        } else {
            micaCommon.autoHeightResize.resizeFlag = true;
            $(window).resize(function () {
                //        	for (var i = 0; i < els.length; i++) {
                $.each(micaCommon.autoHeightResize.els, function (i, v) {
                    //                var el = $(els[i]);
                    var el = $("#" + i);
                    if (micaCommon.autoHeightResize.obj[el] == null) { micaCommon.autoHeightResize.obj[el] = {}; }
                    var oriWidth = micaCommon.autoHeightResize.obj[el].width || 0;
                    micaCommon.autoHeightResize.obj[el] = { width: el.width() };

                    if (el.parents(".w-row.jqx-splitter").length > 0) {

                    } else {
                        micaCommon.autoHeightResize.els[el.attr("id")].duplication = true;
                        //var minHeight = options.minHeight || 815;

                        var minHeight = micaCommon.autoHeightResize.els[el.attr("id")].minHeight || 815;
                        var minusHeight = micaCommon.autoHeightResize.els[el.attr("id")].minusHeight || minHeight;
                        var splitCount = micaCommon.autoHeightResize.els[el.attr("id")].splitCount || 1;
                        var oriHeight = el.height();
                        el.height("");
                        var height = 0;
                        if (oriHeight != $("body").height() - minusHeight) {
                            if ($("body").height() > minHeight) {
                                height = $("body").height() - minusHeight;
                            } else {
                                height = (minHeight - minusHeight) * 1;
                            }
                        } else {
                            height = false;
                            el.height(oriHeight);
                        }
                        if (typeof height != "boolean" && oriWidth != el.width()) {
                            height = height / splitCount;
                            if (micaCommon.autoHeightResize.num++ < 100) {
                                if (el.hasClass("jqx-splitter")) {

                                    el.height(height);
                                    el.jqxSplitter({ height: el.height() }).resize();
                                } else {
                                    el.height(height);
                                }
                            } else {
                                micaCommon.autoHeightResize.num = 0;
                            }
                        } else {
                            if (typeof height != "boolean") {
                                el.height(height / splitCount);
                            }
                        }
                    }
                });
            }).resize();

        }
    },
    autoHeightResizeClear: function (els, options) {
        // remove 해당 아이디는 더이상 리사이즈를 안한다.
        els = $(els);
        for (var i = 0; i < els.length; i++) {
            var el = $(els[i]);
            var id = el.attr("id");
            if (micaCommon.autoHeightResize.els != null) {
                delete micaCommon.autoHeightResize.els[id];
            }
        }
    },
    splash: {
        name: "spinner_",
        ids: [],
        initFlag: true, // true면 init을 해야함.
        ie: false,
        init: function () {
            if (this.initFlag) {
                var that = this;
                $(window).resize(function () {
                    for (var i in that.ids) {
                        var id = that.ids[i]
                        that.resize("#" + id);
                    }
                });

                this.ieCheck();
                this.initFlag = false;
            }
        },
        ieCheck: function () {
            var agent = navigator.userAgent.toLowerCase();
            var ie = agent.indexOf("msie") > -1 ? "IE" : "other"; // < ie11
            ie = (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ? "IE" : ie; // = ie11
            if (ie == "IE") {
                this.ie = true;
            }
        },
        set: function (el, options) {
            options = options || {};
            this.init();
            if (el == null) {
                el = $("body");
            }
            el = $(el);
            el.uniqueId();
            var id = el.attr("id");
            this.ids.push(id);
            var fontSize = options.fontSize || "50px";
            var background = options.background || "rgba(0, 0, 0, 0.2)"
            var html = this.ie ?
                 //src="/Content/js/mica/splash.html"
                // MS_IE
                '<div id="#{id}" style="display:none; position: fixed; top:#{top}; font-size: #{fontSize};z-index: 99999999999;background: #{background}; color:white;">' +
                    '<div class="w-icon fa fa-spinner fa-spin" style="position: fixed; text-align: center;"></div>' +
                '</div>'
                //'</iframe>'
                    :
                // 기타
                '<div id="#{id}" style="display:none; position: fixed; top:#{top}; text-align: center;font-size: #{fontSize};z-index: 99999999999;background: #{background}; color:white;">' +
                    '<div class="w-icon fa fa-spinner fa-spin" style="position: fixed;"></div>' +
                '</div>';
            el.find("#" + this.name + id).remove();
            el.prepend(html.replace(/#{id}/gi, this.name + id).replace(/#{fontSize}/gi, fontSize).replace(/#{background}/gi, background).replace(/#{top}/gi, el.offset().top + "px"));
            for (var i in this.ids) {
                var id = this.ids[i]
                this.resize("#" + id);
            }
            return "#" + this.name + id;
        },
        resize: function (el) {
            el = $(el);
            var height = el.height();
            var width = el.width();
            var id = el.attr("id");
            var spinner = $("#" + this.name + id);
            spinner.width(width);
            spinner.height(height);
            spinner.find(".fa").css("line-height", height + "px");
            if (this.ie) {
                spinner.find(".fa").width(width);
            }
        },
        show: function (el) {
            if (el == null) {
                if (this.ids[0] == null) {
                    this.set();
                }
                el = "#" + this.name + this.ids[0];
            }
            el = $(el);
            el.show();
        },
        hide: function (el) {
            if (el == null) {
                el = "#" + this.name + this.ids[0];
            }
            el = $(el);
            el.hide();
        }
    },
    messageBox: (function (args) {
        // micaCommon.messageBox({width:500, height:145, type:"primary, success, info, warning, danger", subTitle:"Sub Title", title : "Title", html : "가나다라마바사", okButton : { text: "ok", after : function(){ alert('ok'); }  }});
        var f = function (options) {
            var flag = options == null ? "get" : "set";
            var result = {};
            switch (flag) {
                case "get":
                    result = micaCommon.messageBox.values();
                    break;
                case "set":
                    result = micaCommon.messageBox.set(options);
                    break;
            }
            return result;
        };

        for (i in args) {
            f[i] = args[i];
        }
        return f;
    }
        ({
            result: {},
            resetFlag: true,
            values: function () {
                //var result = {};
                //if (openMes.user.resetFlag) {
                //    openMes.user.result.SITEID = sessionStorage.getItem("SITEID");
                //    openMes.user.result.USERID = sessionStorage.getItem("USERID");
                //    openMes.user.result.USERNAME = sessionStorage.getItem("USERNAME");
                //    openMes.user.result.LANGUAGE = sessionStorage.getItem("LANGUAGE");
                //    openMes.user.result.USERCLASSID = sessionStorage.getItem("USERCLASSID");
                //    openMes.user.resultParse();
                //}
                //result = openMes.user.result;
                //if (typeof obj1 == "string") {
                //    result = result[obj1];
                //}
                //openMes.user.resetFlag = false;
                //return result;
                return null;
            },
            set: function (options) {
//            	if(options.okButton == null) {
//            		mCommon.messageBox(options);
//            		return;
//        		}
                //$('.micaMsgBoxSet').micaModal('hide');


                if ($('.micaMsgBoxSet').next().attr("class") == "mm-backdrop fade in mm-stack") {
                    $(".mm-backdrop.fade.in.mm-stack").remove();
                }
                $('.micaMsgBoxSet').remove();
                if (options) {
                    if (typeof options == "string") {
                        options = JSON.parse(options);
                    }
                    if (options.id == null) {
                        options.id = "";
                    }
                    // panel-primary , .panel-success, .panel-info, panel-warning, .panel-danger
                    // primary, success, info, warning, danger
                    var popWidth = (typeof options.width === "undefined" ? 400 : options.width) + "px";
                    var popHeight = (typeof options.height === "undefined" ? 200 : options.height) + "px";
                    var popLeft = ($(window).width() / 2) - (popWidth.replace('px', '') / 2) + "px";
                    var popTop = ($(window).height() / 2) - (popHeight.replace('px', '') / 2) + "px";
                    var popType = (typeof options.type === "undefined" ? "panel-" + "primary" : "panel-" + options.type);
                    var popFontSize = (typeof options.fontSize === "undefined" ? 12 : options.fontSize) + "px";
                    var popHeaderSize = (typeof options.fontSize === "undefined" ? 32 : options.headerSize) + "px";
                    var popFooterSize = (typeof options.fontSize === "undefined" ? 35 : options.footerSize) + "px";
                    var popFooterFontSize = (typeof options.fontSize === "undefined" ? 12 : options.footerFontSize) + "px";
                    
                    // from. 김대성
                    var fadeStr = "";
                    if (null == options.isFade || options.isFade) {
                        fadeStr = " fade";//앞에 공백 한칸 꼭 주세요
                    }

                    $('body').append($('<div/>', {
                        "class": "micaMsgBoxSet modal fade" + fadeStr,
                        "id": options.id,
                        "data-draggable": true
                        //style: "position:fixed; width:" + popWidth + "; height:" + popHeight + "; left:" + popLeft + "; top:" + popTop
                    }));

                    $('.micaMsgBoxSet').append($('<div/>', {
                        "class": "micaMsgBox panel " + popType,
                        style: "width:" + popWidth + "; height:" + popHeight + "; font-size:" + popFontSize
                        //style: "position:fixed; width:"+ popWidth + "; height:" + popHeight + "; left:" + popLeft + "; top:"+ popTop
                    }));

                    // heading
                    $('.micaMsgBox').append($('<div/>', {
                        "class": "panel-heading w-clearfix",
                         style: "height:"+ popHeaderSize +"; font-size:"+ popFontSize
                    }));

                    $('.micaMsgBox .panel-heading')
                    .append($('<div/>', {
                        "class": "pop-h1",
                        style: "display: inline-block; margin-top: 5px; height:"+ popHeaderSize+"; font-size:"+ popFontSize,
                        html: options.title == null ? "Message" : options.title
                    }))
                    .append($('<a/>', {
                        href: "#",
                        //"class": "close-btn",
                        "class": "w-inline-block close-btn",
                        style: "width: 23px; height: 23px; margin-top: 3px; margin-right: 5px; float: right; border: 2px solid white; border-radius: 50%; color: white; font-size: 10px; line-height: 20px; text-align: center; top:0px; right:0px; padding:0px; background-color: transparent;"
                    }));

                    $('.micaMsgBox .panel-heading .close-btn').append($('<div/>', {
                        class: "w-icon fa fa-times close-icon",
                        style: "margin-top: 0px; margin-right: 0px; display: inline-block;"
                    }));

                    // toolbar
                    if (options.subTitle != null) {
                        // toolbar
                        $('.micaMsgBox').append($('<div/>', {
                            "class": "panel-toolbar"
                        }));

                        $('.micaMsgBox .panel-toolbar').append($('<div/>', {
                            class: "pop-tool",
                            style: "display: block; height:"+ popHeaderSize+";padding-left: 10px; color: #7d7d7d; line-height: 32px;"
                        }));

                        $('.micaMsgBox .panel-toolbar .pop-tool')
                        .append($('<div/>', {
                            class: "w-icon fa fa-exclamation-triangle"
                        }))
                        .append($('<div/>', {
                            class: "pop-txt",
                            style: "display: inline-block;",
                            html: options.subTitle
                        }));
                    }

                    // body
                    $('.micaMsgBox').append($('<div/>', {
                        "class": "panel-body"
                    }));

                    $('.micaMsgBox .panel-body').append($('<div/>', {
                        "class": "pop-body",
                        style: "padding: 10px; height: calc(100% - 68px)"
                    }));

                    $('.micaMsgBox .panel-body .pop-body').append($('<div/>', {
                        "class": "w-form",
                        style: "overflow-y: auto; height: 100%;",
                        html: options.html
                    }));

                    // footer
                    $('.micaMsgBox').append($('<div/>', {
                        "class": "panel-footer",
                        //footer modal 밑에 고정
                        style: "position: absolute;bottom: 0;width: 100%; height:"+popFooterSize
                    }));

                    $('.micaMsgBox .panel-footer').append($('<div/>', {
                        "class": "pop-footer",
                        style: "line-height: 35px; text-align: center; font-size:"+popFooterFontSize +"; height:"+popFooterSize
                    }));

                    // Ok Button
                    if (typeof options.okButton != "undefined") {
                        $('.micaMsgBox .panel-footer .pop-footer').append($('<a/>', {
                            "class": "w-inline-block pop-btn btn-ok " + "btn-" + options.type,
                            href: '#',
                            style: " width: 100px; height: 25px; margin-top: 5px; margin-right: 5px; margin-left: 5px; line-height: 27px;;"
                        }));

                        $('.micaMsgBox .panel-footer .btn-ok').append($('<div/>', {
                            class: "w-icon fa fa-pencil icon",
                            style: "margin-top: 0px; margin-right: 5px; font-size: 12px;"
                        })).append($('<div/>', {
                            class: "pop-txt",
                            html: typeof options.okButton.text == "undefined" ? "OK" : options.okButton.text,
                            style: "display: inline-block;"
                        }));

                        if (typeof options.okButton.after != "undefined") {
                            $('.micaMsgBoxSet .micaMsgBox .panel-footer .pop-footer .btn-ok').click(function (e) {
                                options.okButton.after(e);
                                $('.micaMsgBoxSet').micaModal('hide');
                            });
                        }
                    }

                    // cancel button
                    if (options.closeButton == null) {
                        options.closeButton = {};
                    }
                    $('.micaMsgBoxSet .micaMsgBox .panel-footer .pop-footer').append($('<a/>', {
                        "class": "w-inline-block pop-btn btn-grey btn-cancel",
                        href: '#',
                        style: " width: 100px; height: 25px; margin-top: 5px; margin-right: 5px; margin-left: 5px; line-height: 27px;"
                    }));

                    $('.micaMsgBox .panel-footer .btn-cancel').append($('<div/>', {
                        class: "w-icon fa fa-close",
                        style: "margin-top: 0px; margin-right: 5px; font-size: 12px;"
                    })).append($('<div/>', {
                        class: "pop-txt",
                        html: typeof options.closeButton.text == "undefined" ? "Close" : options.closeButton.text,
                        //html: "Close",
                        style: "display: inline-block;"
                    }));

                    $('.micaMsgBox .panel-heading .close-btn').click(function () { $('.micaMsgBoxSet').micaModal('hide') });
                    $('.micaMsgBox .panel-footer .btn-cancel').click(function () { $('.micaMsgBoxSet').micaModal('hide') });
                    if (typeof options.closeButton.after != "undefined") {
                        $('.micaMsgBox .panel-heading .close-btn, .micaMsgBox .panel-footer .btn-cancel').click(function (e) {
                            //$('.micaMsgBoxSet').micaModal('hide');
                            options.closeButton.after(e);
                        });
                    }
                    
                    if(options.type == "success"){
//                    	$(document).on('keydown', $('.micaMsgBox .panel-footer .btn-cancel'), function(e) {
//                			if(e.keyCode == 13) {
//                				$('.micaMsgBox .panel-footer .btn-cancel').click();
//                			}
//                		});
//                    	setTimeout(function() {
//            				$(".micaMsgBoxSet").micaModal("hide");
//            			}, 1000);
                    }
                }
                //openMes.user.resetFlag = true;

                $('.micaMsgBoxSet').micaModal('show');
                $('.micaMsgBoxSet').css("z-index", 99999999);
                
            },
            errorBox: function (xhr) {
                micaCommon.splash.hide();
                switch (xhr.status) {
                    case 404:
                        micaCommon.messageBox({ type: "danger", width: "400", height: "145", html: xhr.responseJSON.Message });
                        break;
                    case 500:
                        micaCommon.messageBox({ title: xhr.responseJSON.Message, type: "danger", width: "400", height: "145", html: xhr.responseJSON.ExceptionMessage });
                        break;
                }
            }

        })),
    datetimepicker: function (el, options) {
        // options : {dataFormat: "Y-m-d H:i:s", dateFormat: "dateTime"}

        el = $(el);
        options = options || {};
        var dataFormat = options.dataFormat || "Y-m-d";
        var dateFormat = options.dateFormat || "dateTime";

        var options = {
            format: dataFormat,
            formatDate: dataFormat,
            step: 60
        };
        if (dateFormat.indexOf("time") < 0 && dateFormat.indexOf("date") < 0) {
            $.extend(options, {
                timepicker: dateFormat.indexOf("time") > -1,
                datepicker: true
            });
        } else {
            $.extend(options, {
                timepicker: dateFormat.indexOf("time") > -1,
                datepicker: dateFormat.indexOf("date") > -1,
            });

        }
        if (dataFormat == "Y-m") {
            $.extend(options, {
                onGenerate: function (a, b) {
                    //$(".xdsoft_datetimepicker[style*='display: block']");
                    var clone = $($(".xdsoft_datetimepicker[style*='display: block']").find("tr")[2]).find("td:first").clone();
                    clone.css("width", "1%");
                    clone.html("<div style='text-align:center'>OK</div>");
                    $(".xdsoft_datetimepicker[style*='display: block']").find(".xdsoft_calendar").html(clone);
                },
                onShow: function (a, b) {
                    var picker = $(".xdsoft_datetimepicker");
                    $.each(picker, function (i, v) {
                        var clone = $($(v).find("tr")[2]).find("td:first").clone();
                        clone.css("width", "1%");
                        clone.html("<div style='text-align:center'>OK</div>");
                        $(v).find(".xdsoft_calendar").html(clone);
                    });
                }
            });
        }

        el.addClass("w-input");
        el.attr("input-type", "datepicker");
        el.attr("date-format", dateFormat);
        el.datetimepicker(options);
    },
    token: (function (userInfo, fnSuccess, fnFail) {
        //var userInfo = {};
        //userInfo.id = "UserId";
        //userInfo.username = "UserName";
        //userInfo.password = "UserPassword";
        userInfo.grant_type = "password";

        $.ajax({
            url: "/token",
            contentType: "x-www-form-urlencoded",
            data: userInfo,
            type: "POST",
            async: false,
            beforeSend: function (xhr) {

            },
            success: function (data) {
                data.userId = userInfo.id;
                sessionStorage.setItem('authorization', JSON.stringify(data));
                var authorization = data.token_type + " " + data.access_token;

                $.ajaxSetup({
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", authorization);
                    },
                    global: true
                });
                //$.post("/System/login", userInfo).done(loginSuccess).fail(ajaxFail);
                return fnSuccess();
            },
            error: function (a, b, c) {
                return fnFail(a, b, c);
            }
        });
    }),
    browser: {
        close: function () {
            // IE는 기능이 되고 있으나, chrome은 정상 동작 하지 않음
            var version = 0;
            if (navigator.appVersion.indexOf("MSIE") != -1) {
                var temp = navigator.appVersion.split("MSIE");
                version = parseFloat(temp[1]);
            }
            if (version >= 5.5 && version <= 6) {
                this.focus();
                self.opener = this;
                self.close();
            } else {
                // 처음 열린 페이지는 닫혀지나, 페이지 이동 후에는 정상 동작 하지 못함
                window.open('', '_parent', '');
                window.close();
            }
        },
        fullScreen: {
            show: function (el) {
                //micaCommon.browser.fullScreen.show();
                //debugger;
                //el = el || $('div');
                //var divObj = el[0];  //  get the target element
                //var divObj = document.getElementsByTagName("html")[0];
                //if (divObj.requestFullscreen)
                //    if (document.fullScreenElement) {
                //        document.cancelFullScreen();
                //    } else {
                //        divObj.requestFullscreen();
                //    }
                //else if (divObj.msRequestFullscreen)
                //    if (document.msFullscreenElement) {
                //        document.msExitFullscreen();
                //    } else {
                //        divObj.msRequestFullscreen();
                //    }
                //else if (divObj.mozRequestFullScreen)
                //    if (document.mozFullScreenElement) {
                //        document.mozCancelFullScreen();
                //    } else {
                //        divObj.mozRequestFullScreen();
                //    }
                //else if (divObj.webkitRequestFullscreen)
                //    if (document.webkitFullscreenElement) {
                //        document.webkitCancelFullScreen();
                //    } else {
                //        divObj.webkitRequestFullscreen();
                //    }
                //  stop bubbling so we don't get bounce back
                //evt.stopPropagation();
                var el = document.documentElement
                , rfs = // for newer Webkit and Firefox
                       el.requestFullScreen
                    || el.webkitRequestFullScreen
                    || el.mozRequestFullScreen
                    || el.msRequestFullScreen
                ;
                if (typeof rfs != "undefined" && rfs) {
                    rfs.call(el);
                } else if (typeof window.ActiveXObject != "undefined") {
                    // for Internet Explorer
                    var wscript = new ActiveXObject("WScript.Shell");
                    if (wscript != null) {
                        wscript.SendKeys("{F11}");
                    }
                }
            },
            exit: function () {
                if (document.exitFullscreen)
                    document.exitFullscreen();
                else if (document.msExitFullscreen)
                    document.msExitFullscreen();
                else if (document.mozCancelFullScreen)
                    document.mozCancelFullScreen();
                else if (document.webkitExitFullscreen)
                    document.webkitExitFullscreen();
            }
        }
    },
    progress: {
        set: function ($el, param) {
            // progress.set($('.col-md-offset-3.col-md-6'), {value : 80, backgroundColor : #5cb85c, class : red});
            // backgroundColor 이 class 보다 우선임
            var style = "<style type='text/css'>";
            style += ".progress {                                                                              ";
            style += "    height: 25px;                                                                        ";
            style += "    background: #262626;                                                                 ";
            style += "    padding: 5px;                                                                        ";
            style += "    overflow: visible;                                                                   ";
            style += "    border-radius: 20px;                                                                 ";
            style += "    border-top: 1px solid #000;                                                          ";
            style += "    border-bottom: 1px solid #7992a8;                                                    ";
            style += "    margin-top: 50px;                                                                    ";
            style += "}                                                                                        ";
            style += "                                                                                         ";
            style += ".progress .progress-bar {                                                                ";
            style += "    border-radius: 20px;                                                                 ";
            style += "    position: relative;                                                                  ";
            style += "    animation: animate-positive 2s;                                                      ";
            style += "}                                                                                        ";
            style += "                                                                                         ";
            style += ".progress .progress-value {                                                              ";
            style += "    display: block;                                                                      ";
            style += "    padding: 3px 7px;                                                                    ";
            style += "    font-size: 13px;                                                                     ";
            style += "    color: #fff;                                                                         ";
            style += "    border-radius: 4px;                                                                  ";
            style += "    background: #191919;                                                                 ";
            style += "    border: 1px solid #000;                                                              ";
            style += "    position: absolute;                                                                  ";
            style += "    top: -40px;                                                                          ";
            style += "    right: -10px;                                                                        ";
            style += "}                                                                                        ";
            style += "                                                                                         ";
            style += ".progress .progress-value:after {                                                        ";
            style += "    content: '';                                                                         ";
            style += "    border-top: 10px solid #191919;                                                      ";
            style += "    border-left: 10px solid transparent;                                                 ";
            style += "    border-right: 10px solid transparent;                                                ";
            style += "    position: absolute;                                                                  ";
            style += "    bottom: -6px;                                                                        ";
            style += "    left: 26%;                                                                           ";
            style += "}                                                                                        ";
            style += "                                                                                         ";
            style += ".progress-bar.active {                                                                   ";
            style += "    animation: reverse progress-bar-stripes 0.40s linear infinite, animate-positive 2s;  ";
            style += "}                                                                                        ";
            style += "                                                                                         ";
            style += "@-webkit-keyframes animate-positive {                                                    ";
            style += "    0% {                                                                                 ";
            style += "        width: 0;                                                                        ";
            style += "}                                                                                        ";
            style += "}                                                                                        ";
            style += "                                                                                         ";
            style += "@keyframes animate-positive {                                                            ";
            style += "    0% {                                                                                 ";
            style += "        width: 0;                                                                        ";
            style += "}                                                                                        ";
            style += "</style>                                                                                 ";
            $('head').append(style);

            var elProgress = $('<div/>', { class: 'progress' });
            $el.append(elProgress);

            var backgroundColor = "";
            if (param.backgroundColor)
                backgroundColor = "background-color : " + param.backgroundColor + "; ";

            var cClass = param.class || "";

            var elProgressBar = $('<div/>', {
                class: 'progress-bar progress-bar-success progress-bar-striped active ' + cClass,
                style: "width:" + param.value + "%; " + backgroundColor
            });

            elProgress.append(elProgressBar);

            var elProgressValue = $('<div/>', { class: "progress-value" }).html(param.value + "%");
            elProgressBar.append(elProgressValue);
        }, // eof set
        changeValue: function ($el, value) {
            //// micaCommon.progress.chagneValue($(element), 40);
            $el.find('.progress-value').html(value + "%");
            $el.find('.progress-value').parent().css("width", value + "%");
        }
    },
    mouse: {
        rightButtonClick: {
            disable: function ($el) {
                // $el : 우클릭 방지 할 element
                // micaCommon.mouse.rightButtonClick.disable($el);
                $el = typeof $el == 'string' ? $($el) : $el;
                $el.on().bind("contextmenu", function (e) {
                    return false;
                });

            }
        }
    },
    imageToSvg: function ($el) {
        //imageToSvg($('div.mright img'))
        $el.each(function () {
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src') || $img.css('background-image').replace('url("', '').replace('")').replace('undefined', '');
            jQuery.get(imgURL, function (data) {
                // Get the SVG tag, ignore the rest
                var $svg = jQuery(data).find('svg');

                // Add replaced image's ID to the new SVG
                if (typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if (typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass + ' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Replace image with new SVG
                $img.replaceWith($svg);

                $svg.css({ 'height': '100%', 'width': '100%' });
            }, 'xml');

        });

    },
    GUID: {
        generate: function () {
            var d = new Date().getTime();
            if (window.performance && typeof window.performance.now === "function") {
                d += performance.now();; //use high-precision timer if available
            }
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        }
    }
};

micaCommon.init = (function () {
//    if (micaConfig.openmes) {
//        if ($ != null) {
//            $("head").append("<script src='/Content/js/mica/mica.openmes.js'>");
//        }
//    }
})();

//MICA Modal
(function ($) {
    'use strict';

    // MODAL CLASS DEFINITION
    // ======================
    var micaModal = function (element, options) {
        this.options = options;
        this.$body = $(document.body);
        this.$element = $(element);
        this.$dialog = this.$element.find('.panel');
        //this.$dialog = this.$element.find('.mm-dialog')
        this.$backdrop = null;
        this.isShown = null;
        this.originalBodyPad = null;
        this.scrollbarWidth = 0;
        this.ignoreBackdropClick = false;
        if (this.options.remote) {
            this.$element
              .find('.mm-content')
              .load(this.options.remote, $.proxy(function () {
                  this.$element.trigger('loaded.bs.micaModal')
              }, this));
        }
    };

    micaModal.VERSION = '3.3.6';

    micaModal.TRANSITION_DURATION = 300;
    micaModal.BACKDROP_TRANSITION_DURATION = 150;

    micaModal.DEFAULTS = {
        backdrop: 'static',
        keyboard: true,
        show: true,
        draggable: true,
        width: false,
        resizable: false,
        paramObject: {}
    };

    micaModal.prototype.getParamObject = function () {
        return micaModal.DEFAULTS.paramObject;
    };

    micaModal.prototype.toggle = function (_relatedTarget) {
        return this.isShown ? this.hide() : this.show(_relatedTarget)
    };

    micaModal.prototype.show = function (_relatedTarget) {
        var that = this;
        var e = $.Event('show.bs.micaModal', { relatedTarget: _relatedTarget });

        this.$element.trigger(e);

        if (this.isShown || e.isDefaultPrevented()) return;

        this.isShown = true;

        this.checkScrollbar();
        this.setScrollbar();
        this.$body.addClass('mm-open');

        this.escape();
        this.resize();
        this.$element.on('click.dismiss.bs.micaModal', '[data-dismiss="micaModal"]', $.proxy(this.hide, this));

        this.$dialog.on('mousedown.dismiss.bs.micaModal', function () {
            that.$element.one('mouseup.dismiss.bs.micaModal', function (e) {
                if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true;
            })
        });

        this.backdrop(function () {
            var transition = $.support.transition && that.$element.hasClass('fade');

            if (!that.$element.parent().length) {
                that.$element.appendTo(that.$body) // don't move modals dom position
            }

            that.$element
              .show()
              .scrollTop(0);

            that.adjustDialog();

            if (transition) {
                that.$element[0].offsetWidth; // force reflow
            }

            that.$element.addClass('in');

            that.enforceFocus();

            var e = $.Event('shown.bs.micaModal', { relatedTarget: _relatedTarget });

            transition ?
              that.$dialog // wait for modal to slide in
                .one('bsTransitionEnd', function () {
                    that.$element.trigger('focus').trigger(e)
                })
                .emulateTransitionEnd(micaModal.TRANSITION_DURATION) :
              that.$element.trigger('focus').trigger(e);
        });
        if (that.options.draggable) {
            that.$element.children().first().draggable({
                handle: ".panel-heading"
            });
        }

        if (that.options.width) {
            that.$dialog.css({
                width: that.options.width,
                height: 'auto',
                'max-height': '100%'
            });
        }

        var zIndex = 1040 + (10 * $('.modal:visible').length);
        that.$element.css({
            'z-index': zIndex,
            position: 'fixed'
        });
        $('.mm-backdrop').not('.mm-stack').css('z-index', zIndex - 1).addClass('mm-stack');

        that.$element.css('display', 'block');
        that.$dialog.css("margin-top", Math.max(0, ($(window).height() - that.$dialog.height()) / 2));
        if (that.$element.parents("[splitter=col]").length > 0) {
            var colHeight = that.$element.parents("[splitter=col]").height();
            that.$element.parents("[splitter=col]").height("initial");
            setTimeout(function () {
                that.$element.parents("[splitter=col]").height("");
                that.$element.parents("[splitter=col]").height(colHeight);
            });
        }

        if (that.options.resizable) {
            that.$dialog.css({
                overflow: "hidden"
            });
            var resizable = {};
            if (typeof that.options.resizable == "boolean") {
                resizable = {
                    //minHeight: that.$dialog.css("max-height"),
                    //maxHeight: that.$dialog.css("max-height"),
                    minHeight: that.$dialog.height(),
                    maxHeight: that.$dialog.height(),
                    minWidth: that.$dialog.width()
                }
            } else {
                resizable = that.options.resizable;
            }
            that.$dialog.resizable(resizable);
        }
    };

    micaModal.prototype.hide = function (e) {
        if (e) e.preventDefault();

        e = $.Event('hide.bs.micaModal');

        this.$element.trigger(e);

        if (!this.isShown || e.isDefaultPrevented())
            return;

        this.isShown = false;

        this.escape();
        this.resize();

        $(document).off('focusin.bs.micaModal');

        this.$element
          .removeClass('in')
          .off('click.dismiss.bs.micaModal')
          .off('mouseup.dismiss.bs.micaModal');

        this.$dialog.off('mousedown.dismiss.bs.micaModal');

        $.support.transition && this.$element.hasClass('fade') ?
          this.$element
            .one('bsTransitionEnd', $.proxy(this.hideModal, this))
            .emulateTransitionEnd(micaModal.TRANSITION_DURATION) :
          this.hideModal();
    };

    micaModal.prototype.enforceFocus = function () {
        $(document)
          .off('focusin.bs.micaModal') // guard against infinite focus loop
          .on('focusin.bs.micaModal', $.proxy(function (e) {
              if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
                  this.$element.trigger('focus');
              }
          }, this));
    };

    micaModal.prototype.escape = function () {
        if (this.isShown && this.options.keyboard) {
            this.$element.on('keydown.dismiss.bs.micaModal', $.proxy(function (e) {
                e.which == 27 && this.hide();
            }, this))
        } else if (!this.isShown) {
            this.$element.off('keydown.dismiss.bs.micaModal');
        }
    };

    micaModal.prototype.resize = function () {
        if (this.isShown) {
            $(window).on('resize.bs.micaModal', $.proxy(this.handleUpdate, this));
        } else {
            $(window).off('resize.bs.micaModal');
        }
    };

    micaModal.prototype.hideModal = function () {
        var that = this;
        this.$element.hide();
        this.backdrop(function () {
            that.$body.removeClass('mm-open');
            that.resetAdjustments();
            that.resetScrollbar();
            that.$element.trigger('hidden.bs.micaModal');
        })
    };

    micaModal.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null;
    };

    micaModal.prototype.backdrop = function (callback) {
        var that = this;
        var animate = this.$element.hasClass('fade') ? 'fade' : '';

        if (this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate;

            this.$backdrop = $(document.createElement('div'))
              .addClass('mm-backdrop ' + animate)
              .appendTo(this.$body);

            this.$element.on('click.dismiss.bs.micaModal', $.proxy(function (e) {
                if (this.ignoreBackdropClick) {
                    this.ignoreBackdropClick = false;
                    return;
                }
                if (e.target !== e.currentTarget) return;
                this.options.backdrop == 'static'
                  ? this.$element[0].focus()
                  : this.hide();
            }, this));

            if (doAnimate) this.$backdrop[0].offsetWidth; // force reflow

            this.$backdrop.addClass('in');

            if (!callback) return;

            doAnimate ?
              this.$backdrop
                .one('bsTransitionEnd', callback)
                .emulateTransitionEnd(micaModal.BACKDROP_TRANSITION_DURATION) :
              callback();

        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass('in');

            var callbackRemove = function () {
                that.removeBackdrop();
                callback && callback();
            };
            $.support.transition && this.$element.hasClass('fade') ?
              this.$backdrop
                .one('bsTransitionEnd', callbackRemove)
                .emulateTransitionEnd(micaModal.BACKDROP_TRANSITION_DURATION) :
              callbackRemove();

        } else if (callback) {
            callback();
        }
    };

    // these following methods are used to handle overflowing modals

    micaModal.prototype.handleUpdate = function () {
        this.adjustDialog();
    };

    micaModal.prototype.adjustDialog = function () {
        var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;

        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
            paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
        })
    };

    micaModal.prototype.resetAdjustments = function () {
        this.$element.css({
            paddingLeft: '',
            paddingRight: ''
        })
    };

    micaModal.prototype.checkScrollbar = function () {
        var fullWindowWidth = window.innerWidth;
        if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
            var documentElementRect = document.documentElement.getBoundingClientRect();
            fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
        }
        this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
        this.scrollbarWidth = this.measureScrollbar();
    };

    micaModal.prototype.setScrollbar = function () {
        var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10);
        this.originalBodyPad = document.body.style.paddingRight || '';
        if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth);
    };

    micaModal.prototype.resetScrollbar = function () {
        this.$body.css('padding-right', this.originalBodyPad);
    };

    micaModal.prototype.measureScrollbar = function () { // thx walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = 'mm-scrollbar-measure';
        this.$body.append(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this.$body[0].removeChild(scrollDiv);
        return scrollbarWidth;
    };

    micaModal.prototype.confirm = function (option) {
        /*
        option : Confirm Modal 설정 옵션 
            {
                title       : 타이틀
                msg         : 메세지
                yesTxt      : yes 버튼 Text
                noTxt   : no 버튼 text
                yesCallBack : yes 버튼 콜백 함수
                noCallBack  : no버튼 콜백 함수
            }
        */
        var defaults = {
            title: "Confirmation",
            msg: "Are you sure?",
            yesTxt: "Yes",
            noTxt: "No",
            width: "600px",
            backdrop: 'static',
            yesCallBack: false,
            noCallBack: false
        };
        var options = $.extend({}, defaults, typeof option == 'object' && option);

        //confirm modal  
        //var modalTop = $('<div/>', {
        //    class: "modal fade"
        //});
        //$('body').append(modalTop);
        //var dialog = $('<div/>', {
        //    class: "panel panel-primary"
        //});
        //modalTop.append(dialog);
        ////modal header
        //var header = $('<div/>', {
        //    class: "panel-heading"
        //});
        //dialog.append(header);
        //var headerIcon = $('<a/>', {
        //    href: '#',
        //    class: "w-icon fa fa-times h1-icon' close",
        //    'data-dismiss': 'micaModal'
        //});
        //header.append(headerIcon);
        //var headerTitle = $('<h4/>', {
        //    text: options.title
        //});
        //header.append(headerTitle);

        ////modal body
        //var body = $('<div/>', {
        //    class: "panel-body"
        //});
        //dialog.append(body);
        //var bodyMsg = $('<p/>', {
        //    text: options.msg
        //});
        //body.append(bodyMsg);

        ////modal footer
        //var footer = $('<div/>', {
        //    class: "panel-footer"
        //});
        //dialog.append(footer);
        //var yesBtn = $('<button/>', {
        //    type: 'button',
        //    class: 'btn btn-primary',
        //    text: options.yesTxt
        //});
        //footer.append(yesBtn);
        //var noBtn = $('<button/>', {
        //    type: 'button',
        //    class: 'btn btn-primary',
        //    text: options.noTxt
        //});
        //footer.append(noBtn);

        //confirm modal 수정
        var modalTop = $('<div/>', {
            class: "modal fade"
        });
        $('body').append(modalTop);
        //var dialog = $('<div/>', {
        //    class: "panel panel-primary"
        //});
        var dialog = $('<div/>', {
            class: "panel"
        });
        modalTop.append(dialog);
        //modal header
        var header = $('<div/>', {
            class: "panel-heading"
        });
        dialog.append(header);
        var headerIcon = $('<a/>', {
            href: '#',
            class: "w-inline-block close-btn",
            'data-dismiss': 'micaModal'
        });
        header.append(headerIcon);
        var headercloseIcon = $('<div/>', {
            class: "w-icon fa fa-times close-icon"
        });
        headerIcon.append(headercloseIcon);
        var headerTitle = $('<div/>', {
            class: 'pop-h1',
            text: options.title
        });
        header.append(headerTitle);

        //modal body
        var body = $('<div/>', {
            class: "panel-body"
        });
        dialog.append(body);
        var bodyPop = $('<div/>', {
            class: 'pop-body'
        });
        body.append(bodyPop);
        var bodyMsg = $('<div/>', {
            class: 'pop-txt',
            text: options.msg
        });
        bodyPop.append(bodyMsg);

        //modal footer
        var footer = $('<div/>', {
            class: "panel-footer"
        });
        dialog.append(footer);
        var popFooter = $('<div/>', {
            class: "pop-footer"
        });
        footer.append(popFooter);
        var yesBtn = $('<a/>', {
            class: 'w-inline-block pop-btn'
        });
        popFooter.append(yesBtn);
        var yesBtnIcon = $('<div/>', {
            class: 'w-icon fa fa-check icon'
        });
        yesBtn.append(yesBtnIcon);
        var yesBtnTxt = $('<div/>', {
            class: 'pop-txt',
            text: options.yesTxt
        });
        yesBtn.append(yesBtnTxt);
        var noBtn = $('<a/>', {
            class: 'w-inline-block pop-btn grey-btn'
        });
        popFooter.append(noBtn);
        var noBtnIcon = $('<div/>', {
            class: 'w-icon fa fa-close icon'
        });
        noBtn.append(noBtnIcon);
        var noBtnTxt = $('<div/>', {
            class: 'pop-txt',
            text: options.noTxt
        });
        noBtn.append(noBtnTxt);
        //yes click event
        yesBtn.on('click', function () {
            if (options.yesCallBack && $.isFunction(options.yesCallBack)) {
                options.yesCallBack.call(this, true);
            }
            $(modalTop).micaModal('hide');

            setTimeout(function () {
                $(modalTop).remove();
            }, 500);
        });

        //no click event
        noBtn.on('click', function () {
            if (options.noCallBack && $.isFunction(options.noCallBack)) {
                options.noCallBack.call(this, false);
            }
            $(modalTop).micaModal('hide');

            setTimeout(function () {
                $(modalTop).remove();
            }, 500);

        });

        $(modalTop).micaModal({
            backdrop: options.backdrop,
            keyboard: false,
            width: options.width
        });
    };

    // MODAL PLUGIN DEFINITION
    // =======================

    function Plugin(option, _relatedTarget) {
        // MODAL에 parameter를 등록 해서 사용 한다.
        if (typeof option == "string" && option == "getParams")
            return $(this).data('params');

        return this.each(function () {
            var $this = $(this);
            if (typeof option.params !== "undefined") {
                $this.data('params', option.params);
            }
            var data = $this.data('bs.micaModal');
            var options = $.extend({}, micaModal.DEFAULTS, $this.data(), typeof option == 'object' && option);
            $this.attr('tabindex', -1);

            if (!data) $this.data('bs.micaModal', (data = new micaModal(this, options)));
            if (typeof option == 'string') {
                data[option](_relatedTarget);
            }
            else if (options.show) data.show(_relatedTarget);
        });
    };

    var old = $.fn.micaModal;

    $.fn.micaModal = Plugin;
    $.fn.micaModal.Constructor = micaModal;


    // MODAL NO CONFLICT
    // =================

    $.fn.micaModal.noConflict = function () {
        $.fn.micaModal = old;
        return this;
    };


    // MODAL DATA-API
    // ==============

    $(document).on('click.bs.micaModal.data-api', '[data-toggle="micaModal"]', function (e) {
        var $this = $(this);
        var href = $this.attr('href');
        var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))); // strip for ie7
        var option = $target.data('bs.micaModal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data());

        if ($this.is('a')) e.preventDefault();

        $target.one('show.bs.micaModal', function (showEvent) {
            if (showEvent.isDefaultPrevented()) return; // only register focus restorer if modal will actually get shown
            $target.one('hidden.bs.micaModal', function () {
                $this.is(':visible') && $this.trigger('focus');
            });
        });
        Plugin.call($target, option, this);
    });

})(jQuery);

(function ($) {
    "use strict";

    var isIE = window.navigator.appName == 'Microsoft Internet Explorer';

    // FILEUPLOAD PUBLIC CLASS DEFINITION
    // =================================

    var Fileinput = function (element, options) {
        this.$element = $(element);

        this.$input = this.$element.find(':file');
        if (this.$input.length === 0) return;

        this.name = this.$input.attr('name') || options.name;

        this.$hidden = this.$element.find('input[type=hidden][name="' + this.name + '"]');
        if (this.$hidden.length === 0) {
            this.$hidden = $('<input type="hidden">').insertBefore(this.$input);
        }

        this.$preview = this.$element.find('.fileinput-preview');
        var height = this.$preview.css('height');
        if (this.$preview.css('display') !== 'inline' && height !== '0px' && height !== 'none') {
            this.$preview.css('line-height', height);
        }

        this.original = {
            exists: this.$element.hasClass('fileinput-exists'),
            preview: this.$preview.html(),
            hiddenVal: this.$hidden.val()
        };

        this.listen();
    };

    Fileinput.prototype.listen = function () {
        this.$input.on('change.bs.fileinput', $.proxy(this.change, this));
        $(this.$input[0].form).on('reset.bs.fileinput', $.proxy(this.reset, this));

        this.$element.find('[data-trigger="fileinput"]').on('click.bs.fileinput', $.proxy(this.trigger, this));
        this.$element.find('[data-dismiss="fileinput"]').on('click.bs.fileinput', $.proxy(this.clear, this));
    };

    Fileinput.prototype.change = function (e) {
        var files = e.target.files === undefined ? (e.target && e.target.value ? [{ name: e.target.value.replace(/^.+\\/, '') }] : []) : e.target.files;

        e.stopPropagation();

        if (files.length === 0) {
            this.clear();
            return;
        }

        this.$hidden.val('');
        this.$hidden.attr('name', '');
        this.$input.attr('name', this.name);

        var file = files[0];

        if (this.$preview.length > 0 && (typeof file.type !== "undefined" ? file.type.match(/^image\/(gif|png|jpeg)$/) : file.name.match(/\.(gif|png|jpe?g)$/i)) && typeof FileReader !== "undefined") {
            var reader = new FileReader();
            var preview = this.$preview;
            var element = this.$element;

            reader.onload = function (re) {
                var $img = $('<img>');
                $img[0].src = re.target.result;
                files[0].result = re.target.result;

                element.find('.fileinput-filename').text(file.name);

                // if parent has max-height, using `(max-)height: 100%` on child doesn't take padding and border into account
                if (preview.css('max-height') != 'none') $img.css('max-height', parseInt(preview.css('max-height'), 10) - parseInt(preview.css('padding-top'), 10) - parseInt(preview.css('padding-bottom'), 10) - parseInt(preview.css('border-top'), 10) - parseInt(preview.css('border-bottom'), 10));

                preview.html($img);
                element.addClass('fileinput-exists').removeClass('fileinput-new');

                element.trigger('change.bs.fileinput', files);
            };

            reader.readAsDataURL(file);
        } else {
            this.$element.find('.fileinput-filename').text(file.name);
            this.$preview.text(file.name);

            this.$element.addClass('fileinput-exists').removeClass('fileinput-new');

            this.$element.trigger('change.bs.fileinput');
        }
    };

    Fileinput.prototype.clear = function (e) {
        if (e) e.preventDefault();

        this.$hidden.val('');
        this.$hidden.attr('name', this.name);
        this.$input.attr('name', '');

        //ie8+ doesn't support changing the value of input with type=file so clone instead
        if (isIE) {
            var inputClone = this.$input.clone(true);
            this.$input.after(inputClone);
            this.$input.remove();
            this.$input = inputClone;
        } else {
            this.$input.val('');
        }

        this.$preview.html('');
        this.$element.find('.fileinput-filename').text('');
        this.$element.addClass('fileinput-new').removeClass('fileinput-exists');

        if (e !== undefined) {
            this.$input.trigger('change');
            this.$element.trigger('clear.bs.fileinput');
        }
    };

    Fileinput.prototype.reset = function () {
        this.clear();

        this.$hidden.val(this.original.hiddenVal);
        this.$preview.html(this.original.preview);
        this.$element.find('.fileinput-filename').text('');

        if (this.original.exists) this.$element.addClass('fileinput-exists').removeClass('fileinput-new');
        else this.$element.addClass('fileinput-new').removeClass('fileinput-exists');

        this.$element.trigger('reset.bs.fileinput');
    };

    Fileinput.prototype.trigger = function (e) {
        this.$input.trigger('click');
        e.preventDefault();
    };


    // FILEUPLOAD PLUGIN DEFINITION
    // ===========================

    var old = $.fn.fileinput;

    $.fn.fileinput = function (options) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('bs.fileinput');
            if (!data) $this.data('bs.fileinput', (data = new Fileinput(this, options)));
            if (typeof options == 'string') data[options]();
        });
    };

    $.fn.fileinput.Constructor = Fileinput;


    // FILEINPUT NO CONFLICT
    // ====================

    $.fn.fileinput.noConflict = function () {
        $.fn.fileinput = old;
        return this;
    };


    // FILEUPLOAD DATA-API
    // ==================

    $(document).on('click.fileinput.data-api', '[data-provides="fileinput"]', function (e) {
        var $this = $(this);
        if ($this.data('bs.fileinput')) return;
        $this.fileinput($this.data());

        var $target = $(e.target).closest('[data-dismiss="fileinput"],[data-trigger="fileinput"]');
        if ($target.length > 0) {
            e.preventDefault();
            $target.trigger('click.bs.fileinput');
        }
    });

})(window.jQuery);




(function ($) {
    $.fn.micaIframe = function (name, options) {
        switch (name) {
            case "grid":
                var html = $("<div>");
                html.append('<iframe style="width: 100%; height: 100%; border-width: 0px;">');
                //html.find("iframe").attr("src", "/Content/js/mica/grid.html?gridOptions=" + JSON.stringify(options));
                //html.find("iframe").uniqueId();
                var name = "iframe_" + new Date().getTime() + micaCommon.fncS.randomNum(1000, 9999);
                html.find("iframe").attr("name", name);
                html.find("iframe").attr("src", "/micaweb/Content/js/mica/grid.html?" + name);
                html.find("iframe").attr("value", JSON.stringify(options));
                $(this).html(html.html());
                break;
            case "chart":
                var html = $("<div>");
                html.append('<iframe style="width: 100%; height: 100%; border-width: 0px;">');
                //html.find("iframe").attr("src", "/Content/js/mica/grid.html?gridOptions=" + JSON.stringify(options));
                //html.find("iframe").uniqueId();
                var name = "iframe_" + new Date().getTime() + micaCommon.fncS.randomNum(1000, 9999);
                html.find("iframe").attr("name", name);
                html.find("iframe").attr("src", "/micaweb/Content/js/mica/chart.html?" + name);
                html.find("iframe").attr("value", JSON.stringify(options));
                $(this).html(html.html());
                break;
        }
    }
}(jQuery));