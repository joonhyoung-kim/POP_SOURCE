using MetroFramework.Forms;
using SmartMom_Lib;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace SmartMom_Lib
{
    public partial class frmLabelDesign : Form
    {
        DataTable _itemDt = new DataTable();
        DataTable _itemCombinationDt = new DataTable();
        DataTable _methodDt = new DataTable();
        DataSet   _detailBindDs = new DataSet();
        DataTable _landDt = new DataTable();
        DataSet   _labelObjectDs = null;
        DataSet _basicInfoDs = new DataSet();
        DataSet _macDs = new DataSet();

        string _macAddress = "";
        string _print_id = "";
        

        LabelDesignTOZPL _script = new LabelDesignTOZPL();
        DataSet _sampleBindDs = new DataSet();

        public frmLabelDesign()
        {
            InitializeComponent();
            //grdLabelList.SetBorderAndGridlineStyles();
            grdLabelObject.SetBorderAndGridlineStyles();
            

            _macAddress = _script.getDefalutMacAddress();

            DataTable dt1 =  getBCRPortList();
            
            if(dt1 == null)
            {
                frmMessage frm1 = new frmMessage("프린터 정보를 입력하여 주세요.", "OK");
                frm1.ShowDialog();
                btnLabelWizard.Enabled = false;
                return;
            }

            if (dt1.Rows.Count <= 0)
            {
                frmMessage frm1 = new frmMessage("프린터 정보를 입력하여 주세요.", "OK");
                frm1.ShowDialog();
                btnLabelWizard.Enabled = false;
                return;
            }

            _macDs.Tables.Add(dt1);
            _macDs.Tables[0].TableName = "MAC_CUR";

            init_process();
            InitLabelList();
            InitMethodList();
            basic_info_search(_macAddress);

            grdLabelObject.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 10, FontStyle.Bold);
            grdLabelObject.DefaultCellStyle.Font = new Font("맑은고딕", 10);
            grdLabelObject.RowTemplate.Height = 24;


        }

        private DataTable getBCRPortList()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("MACADDRESS", _macAddress);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_bcrport.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            return dt;
        }


        private void basic_info_search(string macAddress)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable _basicInfoDs = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_labelDesign_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            grdLabelMethodList.DataBindDataSource(_basicInfoDs, false, false);

        }

        private void InitLabelList()
        {
            //                                   0               1               2                3             4              5            6  
            string[] headerText = new string[] { "라벨ID",      "라벨명",       "프린터ID",       "생성자",     "생성일자",    "수정자",    "수정일자"         }; //7
            string[] columnName = new string[] { "LABELID",     "LABELDESC",    "PRINTID",        "CREATEBY",   "CREATEDATE",  "UPDATEBY",  "UPDATEDATE"       };
            string[] columnType = new string[] { "T",            "T",            "T",             "T",          "T",           "T",         "T"               };

            int[] columnWidth    = new int[]   { 250,            300,            200,             200,          300,            200,         300               };
            bool[] columnVisible = new bool[]  { true,           true,           true,            true,         true,           true,        true              };
            bool[] columnDisable = new bool[]  { true,           true,           true,            true,         true,           true,        true              };
            string[] cellAlign = new string[]  { "L",            "L",            "L",             "L",          "L",            "L",         "L"               };

            grdLabelList.SetBorderAndGridlineStyles();
            grdLabelList.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);

            grdLabelList.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 10, FontStyle.Bold);
            grdLabelList.DefaultCellStyle.Font = new Font("맑은고딕", 10);
            grdLabelList.RowTemplate.Height = 24;


        }

        private void InitMethodList()
        {
//                                               0               1               2               3  
            string[] headerText = new string[] { "Method ID",    "Method 명",   "구성필드항목",  "필드 Desc"         }; //4
            string[] columnName = new string[] { "METHODID",     "METHODDESC",  "METHODFIELD",   "METHODFIELDDESC"   };
            string[] columnType = new string[] { "T",            "T",            "T",             "T"                };

            int[] columnWidth    = new int[]   { 250,            300,            400,             400                };
            bool[] columnVisible = new bool[]  { true,           true,           true,            true               };
            bool[] columnDisable = new bool[]  { true,           true,           true,            true               };
            string[] cellAlign = new string[]  { "L",            "L",            "L",             "L"                };

            grdLabelMethodList.SetBorderAndGridlineStyles();
            grdLabelMethodList.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);

            grdLabelMethodList.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 10, FontStyle.Bold);
            grdLabelMethodList.DefaultCellStyle.Font = new Font("맑은고딕", 10);
            grdLabelMethodList.RowTemplate.Height = 24;
        }

        private DataTable getPrintInfo()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_printInfo.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            return dt;
        }

        private DataTable getMethodList()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_labelDesign_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            return dt;
        }


        private void init_process()
        {
            
            DataTable dt1 = getPrintInfo();
            _detailBindDs.Tables.Add(dt1);
            _detailBindDs.Tables[0].TableName = "PRINT_CUR";

            DataTable dt2 = getMethodList();
            _detailBindDs.Tables.Add(dt2);
            _detailBindDs.Tables[1].TableName = "METHOD_CUR";

            //_detailBindDs = clsJson.select_DataTable("PRINT_INFO_SELECT^LABEL_METHOD_SELECT", paramMethodMap, "PRINT_CUR", "METHOD_CUR");


            _landDt.Columns.Add("LAND_ID");
            _landDt.Columns.Add("LAND_DESC");

            _landDt.Rows.Add("N", "N(Normal)");
            _landDt.Rows.Add("R", "R(90도)");
            _landDt.Rows.Add("I", "I(180도)");
            _landDt.Rows.Add("B", "B(270도)");


            grdLabelObject.SetComboBoxCell("METHODID", _detailBindDs.Tables["METHOD_CUR"], "METHODID", "METHODDESC");
            grdLabelObject.SetComboBoxCell("LANDSCAPE", _landDt, "LAND_ID", "LAND_DESC");
        }

        private void btnLabelListSearch_Click(object sender, EventArgs e)
        {
            label_list_search();
        }


        private void label_list_search()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_label_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            grdLabelList.DataBindDataSource(dt, true, false);
            _print_id = "";
            grdLabelObject.RemoveAll();

        }

        

        private void Ms_ReplyEvent(DataSet message)
        {
            throw new NotImplementedException();
        }


        private void grdLabelList_CellDoubleClick(object sender, DataGridViewCellEventArgs e)
        {
            int rownum = grdLabelList.CurrentCellAddress.Y;

            string label_id = grdLabelList.Rows[rownum].Cells["라벨ID"].Value.ToString();
            string print_id = grdLabelList.Rows[rownum].Cells["프린터ID"].Value.ToString();

            label_object_search(label_id, print_id);
        }


        private void label_object_search(string label_id, string print_id)
        {
            lblLabelObjectList.Text = label_id;
            _print_id = print_id;

            DataTable dt = clsStatic.getLabelObject(label_id, print_id);

            grdLabelObject.DataBind(dt, true, false);

            for (int i = 0; i < grdLabelObject.Rows.Count; i++)
            {
                grdLabelObject["row_check", i].Value = true;

                string method_id = grdLabelObject["METHODID", i].Value.ToString();
                DataRow[] drs = _detailBindDs.Tables[1].Select("METHODID = '" + method_id + "'");

                 if (drs.Length == 1)
                 {
                    string[] strs = drs[0]["METHODFIELD"].ToString().Split('^');
                    for (int j = 0; j < grdLabelObject.ColumnCount; j++)
                    {
                        bool colorbuf = item_enable_disable(grdLabelObject.Columns[j].Name, ref strs);
                        if (colorbuf == true)
                        {
                            grdLabelObject[j, i].Style.BackColor = Color.White;
                        }
                        else
                        {
                            grdLabelObject[j, i].Style.BackColor = Color.LightGray;
                        }
                    }
                }

            }
        }

        private bool item_enable_disable(string control_tag, ref string[] config_controls)
        {
            bool retbuf = false;

            for (int i = 0; i < config_controls.Length; i++)
            {
                if (control_tag == config_controls[i].Replace("_", ""))
                {
                    retbuf = true;
                    break;
                }
            }

            return retbuf;

        }

        private void btnLabelObjectUpdate_Click(object sender, EventArgs e)
        {
            if (lblLabelObjectList.Text == "Label Object List")
            {
                MessageBox.Show("Label List 항목을 선택하여 주세요.");
                return;
            }

            frmLabelDesign_P01 frm = new frmLabelDesign_P01(lblLabelObjectList.Text, _print_id, "UPDATE", _macAddress);
            frm.Show();
        }


        private void btnLabelWizard_Click(object sender, EventArgs e)
        {
            string label_id = "";
            string print_id = "";
            int checkbuf = 0;

            for (int i = 0; i < grdLabelList.Rows.Count; i++)
            {
                if(grdLabelList["row_check", i].Value == null)
                {
                    continue;
                }

                if ((bool)(grdLabelList["row_check", i].Value) == true)
                {
                    label_id = grdLabelList.Rows[i].Cells["라벨ID"].Value.ToString();
                    print_id = grdLabelList.Rows[i].Cells["프린터ID"].Value.ToString();
                    checkbuf++;
                }
            }

            if (checkbuf == 0)
            {
                frmLabelDesign_P01 frm = new frmLabelDesign_P01(_macAddress);
                frm.ShowDialog();
            }
            else if (checkbuf == 1)
            {
                frmLabelDesign_P01 frm = new frmLabelDesign_P01(label_id, print_id, "WIZARD", _macAddress);
                frm.ShowDialog();
            }
            else
            {
                MessageBox.Show("Label List를 1개만 선택하여 주세요!");
            }
        }

        

        private void Button1_Click(object sender, EventArgs e)
        {
            // 1. 라벨스크립트 클래스 LOAD : 전역변수로 사용  
            LabelDesignTOZPL zplScript = new LabelDesignTOZPL();

            // 2. 디자인 스크립트 로드 : 전역변수로 사용
            DataTable DesignDt = clsLabelSet.LabelDesignDataSet("CT01");

            // 3. 베이직 정보 로드 : 전역변수로 사용
            _macAddress = _script.getDefalutMacAddress();
            DataSet BasicDs = clsLabelSet.basic_info_search(_macAddress);


            // 4-1. 바인딩 데이터(소스 데이터 로드) : 실제 데이터 load부분으로 

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsList.Add(paramsMap);
            string retvalue = "";
            DataTable BindDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_test_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);


            //DataSet testBindDs = zplScript.procedure_process("PK_PM_LABEL.LABEL_SN_DATA_SELECT", sampleParamInMap, "OUT_CUR");

            // 4-2. 라벨 인쇄 : 여러건을 인쇄할 때 사용(datatable)
            //zplScript.bindDataTable_To_ZPL_MAIN(testDesignDt, testBindDs.Tables[0], testBasicDs, "GT_LABEL");
            zplScript.bindDataTable_To_ZPL_MAIN(DesignDt, BindDt, BasicDs, "GTPRINT", _macAddress);


            //--------------------------------------------------------------------------------------------------------------------------//

            // 5-1. 라벨 인쇄 : Dictionary 타입으로 데이터를 저장
            Dictionary<string, string> paramInMap = new Dictionary<string, string>();
            paramInMap.Add("AAA", "lotid test");
            paramInMap.Add("GTNUMBER", "GTNUMBER test");
            paramInMap.Add("PRODUCTDEFID", "PRODUCTDEFID test");
            paramInMap.Add("YYYY", "YYYY test");
            paramInMap.Add("YY", "YY test");
            paramInMap.Add("MM", "MM test");
            paramInMap.Add("DD", "DD test");
            // 5-1. 라벨 인쇄 : 한건을 인쇄할 때 사용(Dictionary)
            //zplScript.bindDictionary_To_ZPL_MAIN(testDesignDt, paramInMap, testBasicDs, "CT_LABEL");
            zplScript.bindDictionary_To_ZPL_MAIN(DesignDt, paramInMap, BasicDs, "GTPRINT", _macAddress);
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }
    }
}
