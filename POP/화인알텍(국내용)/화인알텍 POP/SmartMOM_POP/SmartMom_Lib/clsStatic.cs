using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;

namespace SmartMom_Lib
{
    static public class clsStatic
    {
        public static int _dpiPixcel = 0;

        public static string _serviceSelectURL = "http://211.199.87.243:8200/TU_Platform/pop/request";
        public static string _serviceUsertURL = "http://211.199.87.243:8200/TU_Platform/pop/request/upsert";
        //public static string _serviceSelectURL = "http://localhost:8100/TU_Platform/pop/request";
        //public static string _serviceUsertURL = "http://localhost:8100/TU_Platform/pop/request/upsert";


        public static string _resouceType = "";
        public static string _dialogValue = "";

        public static string _DESTINATION = "";

        public static string _USER_ID = "";
        public static string _USER_NAME = "";
        public static string _MANAGER_YN = "";
        //public static string _DIVISION_CD = "TU";
        //public static string _COMPANY_CD = "EDU";
        //public static string _DIVISION_CD = "XMOM";
        //public static string _COMPANY_CD = "XMOM";
        public static string _DIVISION_CD = "FAKR";
        public static string _COMPANY_CD = "FINEALTECH";
        public static string _MACADDRESS = "";
        public static string _USEMANAGEMENT = "";
        public static string _LABELYN = "";
        public static string _RESOURCE_CD = "";
        public static string _EQUIPMENT_CD = "";
        public static string _SHIFT_ID = "";
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
        public static string _STOCK_TYPE_NAME = "";
        public static string _LOGINREMEMBER = "";
        public static string _LINEREMEMBER = "";
        public static bool _FormsFullScreen = false;

        public static DataTable _moveitemDt = new DataTable();

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
                dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getdynamicFacilitylist.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            }
            else if (clsStatic._resouceType == "TO")
            {
                dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.gettoFacilitylist.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            }

            //DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_toFacility_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            return dt;
        }

        public static DataTable getComCodeListInfo(string codeClassid, string codeId)
        {
            string attribute1 = "";
            string attribute3 = "";
            string attribute4 = "";
            string attribute5 = "";
            string attribute6 = "";

            if(clsStatic._STOCK_TYPE_NAME == "재고이동")
            {
                attribute3 = "Y";
            }
            else if (clsStatic._STOCK_TYPE_NAME == "공정이동" || clsStatic._STOCK_TYPE_NAME == "Pallet구성")
            {
                attribute4 = "Y";
            }
            else if (clsStatic._STOCK_TYPE_NAME == "제품이동")
            {
                attribute5 = "Y";
            }
            else if (clsStatic._STOCK_TYPE_NAME == "자재반납")
            {
                attribute6 = "Y";
            }

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD",  clsStatic._COMPANY_CD);
            paramsMap.Add("CODECLASSID",  codeClassid);
            paramsMap.Add("ATTRIBUTE1",   attribute1);
            paramsMap.Add("ATTRIBUTE3",   attribute3);
            paramsMap.Add("ATTRIBUTE4",   attribute4);
            paramsMap.Add("ATTRIBUTE5",   attribute5);
            paramsMap.Add("ATTRIBUTE6",   attribute6);
            paramsMap.Add("codeId",       codeId);

            paramsList.Add(paramsMap);

            string retvalue = "";

            _moveitemDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getComomCodeList1.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            return _moveitemDt;

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

        public static DataTable getLabelObject(string label_id)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("LABEL_ID", label_id);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_labelObject_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            for(int i=0;i<dt.Rows.Count;i++)
            {
                dt.Rows[i]["labelValue"] = rest_replace_decoder(dt.Rows[i]["labelValue"].ToString());
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
    }
}
