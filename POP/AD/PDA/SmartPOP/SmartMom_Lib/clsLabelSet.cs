using SmartMom_Lib;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;

namespace SmartMom_Lib
{
    public static class clsLabelSet
    {
        #region 라벨 디자인 데이터셋
        /// <summary>
        /// 라벨 디자인 코드를 리턴한다.
        /// </summary>
        /// <param name="label_id">라벨리스트 테이블의 라벨ID값(TB_PM_LABELOBJECT.LABEL_ID)</param>
        /// <param name="print_id">라벨리스트 테이블의 프린터ID값(TB_PM_LABELOBJECT.PRINT_ID)</param>
        /// <returns></returns>
        public static DataTable LabelDesignDataSet(string label_id)
        {
            if (clsStatic._dpiPixcel <= 0)
            {
                clsStatic._dpiPixcel = 8;
            }

            DataTable retDt = clsStatic.getLabelObject(label_id);

            return retDt;
        }

        public static DataTable LabelDesignDataSet(string label_id, string print_id)
        {
            if (clsStatic._dpiPixcel <= 0)
            {
                clsStatic._dpiPixcel = 8;
            }

            DataTable retDt = clsStatic.getLabelObject(label_id, print_id);

            return retDt;
        }

        public static DataTable getMethodList()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_labelDesign_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            return dt;
        }
        
        public static DataTable getBCRPort(string macAddress)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("MACADDRESS", macAddress);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_bcrport.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            return dt;
        }

        public static void setBCRPort()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("P_MACADDRESS", clsStatic._MACADDRESS);
            paramsMap.Add("P_LOGINREMEMBER", clsStatic._LOGINREMEMBER);
            paramsMap.Add("P_LINEREMEMBER", clsStatic._LINEREMEMBER);
            paramsMap.Add("P_UPDATE_BY", clsStatic._USER_ID);
            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable macDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_bcrremember_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (macDt.Rows.Count > 0)
            {
                if (macDt.Rows[0]["p_err_msg"].ToString().Trim() == "")
                {
                    macDt.Rows[0]["p_err_msg"] = "0";
                }
            }
        }

        public static DataTable getBadFlag(string divisioncd, string companycd)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", divisioncd);
            paramsMap.Add("COMPANY_CD", companycd);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_badqtyflag.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            return dt;
        }

        /// <summary>
        /// 
        /// 라벨인쇄에 필요한 데이터셋을 리턴한다.
        /// 라벨인쇄시 반드시 해당 값이 사용됨으로 중요한 놈이다.
        /// </summary>
        /// <param name="macAddress">출력포트정보 검색을 위한 맥어드레스</param>
        /// <returns>라벨인쇄에 필요한 데이터셋을 리턴한다.</returns>
        public static DataSet basic_info_search(string macAddress)
        {
            DataSet ds = new DataSet();
            DataTable dt1 = getMethodList();  
            ds.Tables.Add(dt1);
            ds.Tables[0].TableName = "METHOD_CUR";

            DataTable dt2 = getBCRPort(macAddress);
            ds.Tables.Add(dt2);
            ds.Tables[1].TableName = "MAC_CUR";

            return ds;
        }


        #endregion

        public static string label_sleep_info()
        {
            string retbuf = "10^2000";

            return retbuf;
        }

        public static void dt_label_print(string macaddress, string printport, ref DataTable DesignDt, ref DataSet BasicDs, ref DataTable BindDt)
        {
            // 1. 라벨스크립트 클래스 LOAD : 전역변수로 사용  
            LabelDesignTOZPL zplScript = new LabelDesignTOZPL();

            // 4. 라벨 인쇄 : 여러건을 인쇄할 때 사용(datatable)
            //zplScript.bindDataTable_To_ZPL_MAIN(DesignDt, BindDt, BasicDs, "GTPRINT", macaddress);
            zplScript.bindDataTable_To_ZPL_MAIN(DesignDt, BindDt, BasicDs, printport, macaddress);
        }

        public static void map_label_print(Dictionary<string, string> paramInMap, string macaddress, string printport, ref DataTable DesignDt, ref DataSet BasicDs)
        {
            // 1. 라벨스크립트 클래스 LOAD : 전역변수로 사용  
            LabelDesignTOZPL zplScript = new LabelDesignTOZPL();

            //// 5-1. 라벨 인쇄 : 한건을 인쇄할 때 사용(Dictionary)
            zplScript.bindDictionary_To_ZPL_MAIN(DesignDt, paramInMap, BasicDs, printport, macaddress);
        }

        public static void map_label_print_Config(Dictionary<string, string> paramInMap, string macaddress, string printport, string outputport, ref DataTable DesignDt, ref DataSet BasicDs)
        {
            // 1. 라벨스크립트 클래스 LOAD : 전역변수로 사용  
            LabelDesignTOZPL zplScript = new LabelDesignTOZPL();

            //// 5-1. 라벨 인쇄 : 한건을 인쇄할 때 사용(Dictionary)
            zplScript.bindDictionary_To_ZPL_MAIN_Config(DesignDt, paramInMap, BasicDs, printport, macaddress, outputport);
        }

        public static void label_print(string _macAddress, string printid, string pallet, string gt, string ct, string ganbanid, string reprintFlag, ref DataSet BasicDs)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();

            string retvalue = "";

            DataTable dt = new DataTable();
            // 원부자재 ganban 라벨 정보 조회
            if(ganbanid != "")
            {
                paramsMap.Add("p_err_code", "");
                paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
                paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
                paramsMap.Add("GANBAN_ID", ganbanid);

                paramsList.Add(paramsMap);

                dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_labelganbaninfo.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            }
            // 제품/반제품 ct 라벨 정보 조회
            else if(ct != "")
            {
                paramsMap.Add("p_err_code", "");
                paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
                paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
                paramsMap.Add("WORK_ORDER_ID", clsStatic._WORK_ORDER_ID);
                paramsMap.Add("CT", ct);

                paramsList.Add(paramsMap);

                //  dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_labelsninfo.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
                  dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_labelsnBadinfo.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            }
            else if(pallet != "")
            {
                paramsMap.Add("p_err_code", "");
                paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
                paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
                paramsMap.Add("WORK_ORDER_ID", clsStatic._WORK_ORDER_ID);
                paramsMap.Add("PT", pallet);

                paramsList.Add(paramsMap);

                dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_labelsninfo.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            }

            if (dt == null)
            {
                return;
            }
            else if(dt.Rows.Count <= 0)
            {
                return;
            }

            string gtType = dt.Rows[0]["POPGTLABELID"].ToString().Trim();
            string ctType = dt.Rows[0]["POPCTLABELID"].ToString().Trim();
            string palletType = dt.Rows[0]["POPPALLETLABELID"].ToString().Trim();
            string ganbantType = dt.Rows[0]["POPGANBANLABELID"].ToString().Trim();
         

            if (ganbanid != "" && ganbantType == "")
            {
                frmMessage frm = new frmMessage("해당 모델의 간판라벨정보가 설정되어 있지 않습니다.", "AUTOCLOSE");
                frm.ShowDialog();
                return;
            }

            if (ct != "" && ctType == "")
            {
                frmMessage frm = new frmMessage("해당 모델의 CT라벨정보가 설정되어 있지 않습니다.", "AUTOCLOSE");
                frm.ShowDialog();
                return;
            }

            if (pallet != "" && palletType == "")
            {
                frmMessage frm = new frmMessage("해당 모델의 Pallet라벨정보가 설정되어 있지 않습니다.", "AUTOCLOSE");
                frm.ShowDialog();
                return;
            }


            int qty = 0;
            try
            {
                string coluse = dt.Rows[0]["GANBANGOODQTY"].ToString();

                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    qty += int.Parse(dt.Rows[i]["GANBANGOODQTY"].ToString());
                }

            }
            catch
            {

            }
            Dictionary<string, string> paramPrintMap = new Dictionary<string, string>();
            paramPrintMap.Add("ALLQTY", qty.ToString());
            paramPrintMap.Add("REPRINT", reprintFlag);
            for (int i = 0; i < dt.Columns.Count; i++)
            {
                string keyname = dt.Columns[i].Caption.Trim().ToUpper();
                string keyvalue = dt.Rows[0][keyname].ToString().Trim();
                paramPrintMap.Add(keyname, keyvalue);
            }

            if (ganbanid != "")
            {
                DataTable ganban_DesignDt = new DataTable();

                ganban_DesignDt = clsLabelSet.LabelDesignDataSet(ganbantType,printid);        

                clsLabelSet.map_label_print(paramPrintMap, _macAddress, "GANBANPRINT", ref ganban_DesignDt, ref BasicDs);
            }
            else if (ct != "")
            {
                for (int i = 0; i < 100; i++)
                {
                    if (i <= dt.Rows.Count - 1)
                    {
                        try { paramPrintMap.Add("SN" + (i + 1).ToString(), dt.Rows[i]["SN"].ToString().Trim()); } catch { paramPrintMap.Add("SN" + (i + 1), ""); }
                    }
                    else
                    {
                        paramPrintMap.Add("SN" + (i + 1), "");
                    }
                }

                DataTable ct_DesignDt = new DataTable();
                ct_DesignDt = clsLabelSet.LabelDesignDataSet(ctType, printid);

                clsLabelSet.map_label_print(paramPrintMap, _macAddress, "CTPRINT", ref ct_DesignDt, ref BasicDs);
            }
            else if (gt != "")
            {
                DataTable gt_DesignDt = new DataTable();

                gt_DesignDt = clsLabelSet.LabelDesignDataSet(gtType, printid);

                clsLabelSet.map_label_print(paramPrintMap, _macAddress, "GTPRINT", ref gt_DesignDt, ref BasicDs);
            }
            else if (pallet != "")
            {
                string ctbuf = "";
                for (int i = 0; i < 100; i++)
                {
                    if(i ==0)
                    {
                        ctbuf = dt.Rows[i]["CT"].ToString().Trim();
                        try { paramPrintMap.Add("CT" + (i + 1).ToString(), dt.Rows[i]["CT"].ToString().Trim()); } catch { paramPrintMap.Add("CT" + (i + 1), ""); }
                        continue;
                    }
                    if (i <= dt.Rows.Count - 1)
                    {
                        if (ctbuf != dt.Rows[i]["CT"].ToString().Trim())
                        {
                            if (i <= dt.Rows.Count - 1)
                            {
                                try { paramPrintMap.Add("CT" + (i + 1).ToString(), dt.Rows[i]["CT"].ToString().Trim()); ctbuf = dt.Rows[i]["CT"].ToString().Trim(); } catch { paramPrintMap.Add("CT" + (i + 1), ""); ctbuf = ""; }
                            }
                            else
                            {
                                paramPrintMap.Add("CT" + (i + 1), "");
                                ctbuf = "";
                            }

                        }
                    }
                }

                for (int i = 0; i < 100; i++)
                {
                    if (i <= dt.Rows.Count - 1)
                    {
                        try { paramPrintMap.Add("SN" + (i + 1).ToString(), dt.Rows[i]["SN"].ToString().Trim()); } catch { paramPrintMap.Add("SN" + (i + 1), ""); }
                    }
                    else
                    {
                        paramPrintMap.Add("SN" + (i + 1), "");
                    }
                }

                DataTable ct_DesignDt = new DataTable();

                ct_DesignDt = clsLabelSet.LabelDesignDataSet(palletType,printid);

                clsLabelSet.map_label_print(paramPrintMap, _macAddress, "PALLETPRINT", ref ct_DesignDt, ref BasicDs);
            }
        }

    }
}
