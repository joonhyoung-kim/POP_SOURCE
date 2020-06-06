﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.NetworkInformation;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SmartMom_Lib
{
    static public class clsStatic
    {
        public static int _dpiPixcel = 0;

        public static string _serviceSelectURL = "";
        public static string _serviceUsertURL = "";

        public static string _resouceType = "";
        public static string _dialogValue = "";
        public static string _dialogValue2 = "";

        public static string _USER_ID = "";
        public static string _USER_NAME = "";
        public static string _MANAGER_YN = "";
        // 국내 법인
        //public static string _DIVISION_CD = "FAKR";
        // 폴란드 법인
        public static string _DIVISION_CD = "FAKP";
        public static string _COMPANY_CD = "FINEALTECH";
        public static string _MACADDRESS = "";
        public static string _USEMANAGEMENT = "";
        public static string _LABELYN = "";
        public static string _RESOURCE_CD = "";
        public static string _RESOURCE_TEXT = "";
        public static string _WORK_ORDER_ID = "";
        public static string _PERSONCOUNT = "1";
        public static string _BADQTYFLAG = "Y";
        public static string _FROMLINE = "";
        public static string _FROMLINE_DESC = "";
        public static string _TOLINE = "";
        public static string _TOLINE_DESC = "";
        public static string _ITEMTYPE = "";
        public static string _ITEMTYPE_DESC = "";
        public static string _PUSHBUTTON1 = "";
        public static string _PUSHBUTTON2 = "";
        public static string _PRINTID = "";
        public static string _STOCK_TYPE = "";
        public static string _LOGINREMEMBER = "";
        public static string _LINEREMEMBER = "";
        public static int    _BASELOSTTIME = 0;
        public static string _INPUTTYE = "";
        public static string _SHIFT_ID = "";
		/* 2019.08.06 조아람 추가 */
        public static string _WMSMENU = "";
        /* 2019.08.07 김백건 추가 */
        public static string _GTPRINT = "";
        public static string _CTPRINT = "";
        public static string _PALLETPRINT = "";
        public static string _GANBANPRINT = "";
        public static string _EQUIPMENT_CD = "";
        public static string _EQUIPMENT_NAME = "";
        public static string _EQUIPMENT_NUM = "";
        public static string _XPOSITION = "";
        public static string _YPOSITION = "";
        /*------------------------*/

        public static DataTable _badnonDt = new DataTable();


        public static string getDefalutMacAddress()
        {
            const int MIN_MAC_ADDR_LENGTH = 12;
            string macAddress = string.Empty;
            long maxSpeed = -1;

            foreach (NetworkInterface nic in NetworkInterface.GetAllNetworkInterfaces())
            {
                string aaa = "Found MAC Address: " + nic.GetPhysicalAddress() +
                    " Type: " + nic.NetworkInterfaceType;

                string tempMac = nic.GetPhysicalAddress().ToString();
                if (nic.Speed > maxSpeed &&
                    !string.IsNullOrEmpty(tempMac) &&
                    tempMac.Length >= MIN_MAC_ADDR_LENGTH)
                {
                    string bbb = "New Max Speed = " + nic.Speed + ", MAC: " + tempMac;
                    maxSpeed = nic.Speed;
                    macAddress = tempMac;
                }
            }

            _MACADDRESS = macAddress;

            return macAddress;
        }

        public static DataTable getBORInfo()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_popline_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            
            return dt;
        }

        public static DataTable getUserListInfo()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_userline_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);


            return dt;
        }

        public static DataTable getStockListInfo(string facilityClassCd)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("divisionCd", clsStatic._DIVISION_CD);
            paramsMap.Add("companyCd", clsStatic._COMPANY_CD);
            paramsMap.Add("stockType", clsStatic._STOCK_TYPE);
            paramsMap.Add("facilityClassCd", facilityClassCd);
            paramsMap.Add("returnType", "");
            
            paramsList.Add(paramsMap);

            string retvalue = "";
            DataTable dt = new DataTable();

            if (clsStatic._resouceType == "FROM")
            {
                dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_dynamicFacility_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            }
            else if (clsStatic._resouceType == "TO")
            {
                dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_toFacility_list2.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            }

            //DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_toFacility_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            return dt;
        }

        public static DataTable getComCodeListInfo(string codeClassid, string attribute1, string attribute2, string codeId)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD",  clsStatic._COMPANY_CD);
            paramsMap.Add("CODECLASSID",  codeClassid);
            paramsMap.Add("ATTRIBUTE1",   attribute1);
            paramsMap.Add("ATTRIBUTE2",   attribute2);
            paramsMap.Add("codeId",       codeId);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getComomCodeList.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            return dt;
        }

        public static DataTable getDestination()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("divisionCd", clsStatic._DIVISION_CD);
            paramsMap.Add("companyCd", clsStatic._COMPANY_CD);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable destDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_destination.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            return destDt;
        }

        public static DataTable getEquipment()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("RESOURCE_CD", clsStatic._RESOURCE_CD);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable destDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_equipment.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            return destDt;
        }

        public static DataTable getLabelObject(string label_id)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("LABEL_ID", label_id);
            paramsMap.Add("X_POSITION", clsStatic._XPOSITION);
            paramsMap.Add("Y_POSITION", clsStatic._YPOSITION);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_labelObject_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            for(int i=0;i<dt.Rows.Count;i++)
            {
                dt.Rows[i]["labelValue"] = rest_replace_decoder(dt.Rows[i]["labelValue"].ToString());
                dt.Rows[i]["XPOSITIONMM"] = (double.Parse(dt.Rows[i]["XPOSITIONMM"].ToString()) + double.Parse(clsStatic._XPOSITION)).ToString();
                dt.Rows[i]["YPOSITIONMM"] = (double.Parse(dt.Rows[i]["YPOSITIONMM"].ToString()) + double.Parse(clsStatic._YPOSITION)).ToString();
                dt.Rows[i]["XPOSITIONPIX"] = (double.Parse(dt.Rows[i]["XPOSITIONPIX"].ToString()) + (double.Parse(clsStatic._XPOSITION) * 12) ).ToString();
                dt.Rows[i]["YPOSITIONPIX"] = (double.Parse(dt.Rows[i]["YPOSITIONPIX"].ToString()) + (double.Parse(clsStatic._YPOSITION) * 12) ).ToString();
            }

            return dt;
        }

        public static string rest_replace_encoder(string value)
        {
            if (value == null)
            {
                return "";
            }

            string retbuf = value;
            retbuf = retbuf.Replace("+", "@Plus@");
            retbuf = retbuf.Replace("#", "@Shap@");
            retbuf = retbuf.Replace(",", "@Comma@");

            return retbuf;
        }

        public static string rest_replace_decoder(string value)
        {
            if(value == null)
            {
                return "";
            }

            string retbuf = value;
            retbuf = retbuf.Replace("@Plus@", "+");
            retbuf = retbuf.Replace("@Shap@", "#");
            retbuf = retbuf.Replace("@Comma@", ",");

            return retbuf;
        }

        public static string rest_replace_excel_encoder(string value)
        {
            if (value == null)
            {
                return "";
            }

            string retbuf = value;
            retbuf = retbuf.Replace("+", "@Plus@");
            retbuf = retbuf.Replace("#", "@Shap@");
            retbuf = retbuf.Replace(",", "@Comma@");

            return retbuf;
        }

        public static string rest_replace_excel_decoder(string value)
        {
            if (value == null)
            {
                return "";
            }

            string retbuf = value;
            retbuf = retbuf.Replace("@Plus@", "+");
            retbuf = retbuf.Replace("@Shap@", "#");
            retbuf = retbuf.Replace("@Comma@", ",");

            return retbuf;
        }

        [DllImport("user32.dll")]
        public static extern bool RegisterHotKey(IntPtr hWnd, int id, KeyModifiers fsModifiers, Keys vk);

        [DllImport("user32.dll")]
        public static extern bool UnregisterHotKey(IntPtr hWnd, int id);

        const int HOTKEY_ID = 31197; //Any number to use to identify the hotkey instance

        public enum KeyModifiers
        {
            None = 0,
            Alt = 1,
            Control = 2,
            Shift = 4,
            Windows = 8
        }

        public static void Hotkey_Register(Form frm)
        {
            // 0x0 : 조합키 없이 사용, 0x1: ALT, 0x2: Ctrl, 0x3: Shift
            //RegisterHotKey(핸들러함수, 등록키의_ID, 조합키, 등록할_키)
            RegisterHotKey(frm.Handle, 0, 0x0, Keys.F1);
            RegisterHotKey(frm.Handle, 1, 0x0, Keys.F2);
            RegisterHotKey(frm.Handle, 2, 0x0, Keys.F3);
            RegisterHotKey(frm.Handle, 3, 0x0, Keys.F4);
            //RegisterHotKey(frm.Handle, 4, 0x0, Keys.F5);
            RegisterHotKey(frm.Handle, 5, 0x0, Keys.F6);
            RegisterHotKey(frm.Handle, 6, 0x0, Keys.F7);
            RegisterHotKey(frm.Handle, 7, 0x0, Keys.F8);
            //RegisterHotKey(frm.Handle, 8, 0x0, Keys.F9);
            //RegisterHotKey(frm.Handle, 9, 0x0, Keys.F10);
            //RegisterHotKey(frm.Handle, 10, 0x0, Keys.F11);
            RegisterHotKey(frm.Handle, 11, 0x0, Keys.F12);
            RegisterHotKey(frm.Handle, 12, 0x0, Keys.Escape);
        }

        public static void UnHotkey_Register(Form frm)
        {
            UnregisterHotKey(frm.Handle, 0); //이 폼에 ID가 0인 핫키 해제
            UnregisterHotKey(frm.Handle, 1); //이 폼에 ID가 1인 핫키 해제
            UnregisterHotKey(frm.Handle, 2); //이 폼에 ID가 2인 핫키 해제
            UnregisterHotKey(frm.Handle, 3); //이 폼에 ID가 3인 핫키 해제
            //UnregisterHotKey(frm.Handle, 4);
            UnregisterHotKey(frm.Handle, 5);
            UnregisterHotKey(frm.Handle, 6);
            UnregisterHotKey(frm.Handle, 7);
            //UnregisterHotKey(frm.Handle, 8);
            //UnregisterHotKey(frm.Handle, 9);
            //UnregisterHotKey(frm.Handle, 10);
            UnregisterHotKey(frm.Handle, 11);
            UnregisterHotKey(frm.Handle, 12);
        }
    }
}
