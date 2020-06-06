using SmartMom_Lib;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SmartMOM_POP
{
    public partial class frmMatGIWOList : Form
    {
        string _selectYN = "N";

        public frmMatGIWOList()
        {
            InitializeComponent();
        }

        public frmMatGIWOList(string nowDate, string line)
        {
            InitializeComponent();
            InitGridList();
            Load_GI_WO_list(nowDate.Split(' ')[0].ToString(), line);
        }

        private void InitGridList()
        {
            //                                   0                    1                  2              3                      4                    5
            string[] headerText = new string[] { "작업지시서",       "품목",       "P/O",              "납품처",      "납품일자",            "불출요청일자",      "수량",         "선택여부"     }; 
            string[] columnName = new string[] { "WORKORDERID",      "ITEMID",     "PRODUCTORDERID",   "VENDORNAME",  "CUSTOMERDUEDATE",     "REQUESTDATE",       "CONFIRMQTY",   "SELECTYN"     };
            string[] columnType = new string[] { "T",                "T",          "T",                "T",           "T",                   "T",                 "T",            "T"            };

            int[] columnWidth   = new int[]    { 300,                280,          240,                300,           240,                   240,                 180,            100            };
            bool[] columnVisible = new bool[]  { true,               true,         false,              false,         false,                 true,                true,           false          };
            bool[] columnDisable = new bool[]  { true,               true,         true,               true,          true,                  true,                true,           false          };
            string[] cellAlign = new string[]  { "C",                "C",          "C",                "C",           "C",                   "C",                 "C",            "C"            };
                                                                                                                                                                                                  
            grdMain.SetBorderAndGridlineStyles();
            grdMain.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdMain.DefaultCellStyle.Font = new Font("맑은고딕", 24, FontStyle.Bold);
            grdMain.DefaultCellStyle.ForeColor = Color.Black;
            grdMain.RowTemplate.Height = 70;
              
            grdMain.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 24, FontStyle.Bold);
            grdMain.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void Load_GI_WO_list(string nowDate, string line)
        {
            string nowdate = nowDate.Split(' ')[0];
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("divisionCd", clsStatic._DIVISION_CD);
            paramsMap.Add("companyCd", clsStatic._COMPANY_CD);
            paramsMap.Add("fromDate", nowDate);
            paramsMap.Add("toDate", "");
            paramsMap.Add("outLocationCd", line);
            paramsMap.Add("locationCd", clsStatic._FROMLINE);
            paramsMap.Add("stockType", clsStatic._STOCK_TYPE);
            paramsMap.Add("requestState", "W");            
            paramsList.Add(paramsMap);

            string retvalue = "";
            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_materialReleaseWO_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            grdMain.RemoveAll();
            if (dt == null)
            {
                return;
            }

            if (dt.Rows.Count == 0)
            {
                return;
            }

            grdMain.DataBindDataSource(dt, false, false);
        }

        
        private void btnInput_Click(object sender, EventArgs e)
        {
            string woList = "";

            for(int i = 0; i < grdMain.RowCount; i++)
            {
                if(grdMain["선택여부", i].Value.ToString() == "Y")
                {
                    woList = woList + grdMain["작업지시서", i].Value.ToString() + "|";
                }
            }

            if ( woList.Length < 1)
            {
                frmMessage frm1 = new frmMessage("하나 이상의 작업지시서를 선택하셔야 합니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            clsStatic._dialogValue = woList;
            this.Close();
        }

        private void grdMain_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            if (grdMain.Rows.Count < 1)
            {
                return;
            }

            chk_select_row(e);
        }

        //선택된 row 표시
        private void chk_select_row(DataGridViewCellEventArgs e)
        {
            // 1. 그리드 컬럼헤더 영역 클릭했을 경우
            if (e.ColumnIndex == 0 && e.RowIndex < 0 && grdMain.Rows.Count > 0)
            {
                for (int i = 0; i < grdMain.Rows.Count; i++)
                {
                    if (_selectYN == "Y")
                    {
                        // 1.1 전체선택 해제
                        grdMain["선택여부", i].Value = "N";

                        for (int j = 1; j < grdMain.ColumnCount; j++)
                        {
                            grdMain[j, i].Style.BackColor = Color.White;
                        }
                    }
                    else
                    {
                        // 1.2 전체선택
                        grdMain["선택여부", i].Value = "Y";
                        for (int j = 1; j < grdMain.ColumnCount; j++)
                        {
                            grdMain[j, i].Style.BackColor = Color.Yellow;
                        }
                    }
                }

                if (_selectYN == "Y")
                {
                    _selectYN = "N";
                }
                else
                {
                    _selectYN = "Y";
                }

            }
            // 2. 그리드 리스트 영역 클릭했을 경우
            else if (e.RowIndex >= 0)
            {
                // 2.1 선택되어 있었을 경우 선택 해제
                if (grdMain["선택여부", e.RowIndex].Value.ToString() == "Y")
                {
                    grdMain["선택여부", e.RowIndex].Value = "N";

                    for (int j = 1; j < grdMain.ColumnCount; j++)
                    {
                        grdMain[j, e.RowIndex].Style.BackColor = Color.White;
                    }

                }
                // 2.2 선택되지 않았을 경우 선택
                else
                {
                    grdMain["선택여부", e.RowIndex].Value = "Y";
                    for (int j = 1; j < grdMain.ColumnCount; j++)
                    {
                        grdMain[j, e.RowIndex].Style.BackColor = Color.Yellow;
                    }
                }
            }
        }

        private void btnCancel_Click(object sender, EventArgs e)
        {
            this.Close();
        }
    }
}
