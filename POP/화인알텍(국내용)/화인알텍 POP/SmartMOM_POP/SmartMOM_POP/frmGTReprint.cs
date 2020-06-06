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
    public partial class frmGTReprint : Form
    {
        string _ct = "";
        string _gt = "";
        string _gtType = "";
        string _ctType = "";
        DataTable _gt_DesignDt = new DataTable();
        DataTable _ct_DesignDt = new DataTable();
        DataSet _BasicDs = new DataSet();
        public frmGTReprint(string ct, string gtType, string ctType, DataTable gt_DesignDt, DataTable ct_DesignDt, DataSet BasicDs)
        {
            InitializeComponent();

            _gtType = gtType;
            _ctType = ctType;
            _gt_DesignDt = gt_DesignDt;
            _ct_DesignDt = ct_DesignDt;
            _BasicDs = BasicDs;
            _ct = ct;

            InitGTList();

            if (_ct == "NODATA")
            {
                getNodataGTList();
            }
            else
            {
                getGTList();
            }
        }

        private void getNodataGTList()
        {
            string retvalue = "";

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD",   clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD",    clsStatic._COMPANY_CD);
            paramsMap.Add("RESOURCE_CD",   clsStatic._RESOURCE_CD);
            paramsMap.Add("WORK_ORDER_ID", clsStatic._WORK_ORDER_ID);

            paramsList.Add(paramsMap);

            DataTable gtDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_popgt_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            grdGT.DataBindDataSource(gtDt, false, false);
        }

        private void getGTList()
        {
            string retvalue = "";

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD",   clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD",    clsStatic._COMPANY_CD);
            paramsMap.Add("RESOURCE_CD",   clsStatic._RESOURCE_CD);
            paramsMap.Add("WORK_ORDER_ID", clsStatic._WORK_ORDER_ID);
            paramsMap.Add("CT",            _ct);

            paramsList.Add(paramsMap);

            DataTable gtDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_popctingt_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            grdGT.DataBindDataSource(gtDt, false, false);
        }

        private void InitNodataGTList()
        {
            //                                   0                    1
            string[] headerText = new string[] { "제품ID",            "구성수량"        }; //2
            string[] columnName = new string[] { "WORKORDERRESULTID", "GOODQTY"         };
            string[] columnType = new string[] { "T",                "T"                };
                                                           
            int[] columnWidth    = new int[]   {  500,                200               };
            bool[] columnVisible = new bool[]  {  true,               true              };
            bool[] columnDisable = new bool[]  {  true,               true              };
            string[] cellAlign = new string[]  {  "C",                "C"               };

            grdGT.SetBorderAndGridlineStyles();
            grdGT.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdGT.DefaultCellStyle.Font = new Font("맑은고딕", 24F, FontStyle.Bold);
            grdGT.RowTemplate.Height = 120;
            grdGT.SelectionMode = DataGridViewSelectionMode.FullRowSelect;

            grdGT.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 18F, FontStyle.Bold);
            grdGT.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        private void InitGTList()
        {
            //                                   0               1                    2
            string[] headerText = new string[] { "박스포장번호", "제품ID",            "구성수량"        }; //3
            string[] columnName = new string[] { "CT",           "WORKORDERRESULTID", "GOODQTY"         };
            string[] columnType = new string[] {  "T",           "T",                "T"                };
                                                                           
            int[] columnWidth    = new int[]   { 300,             500,                200               };
            bool[] columnVisible = new bool[]  {  true,           true,               true              };
            bool[] columnDisable = new bool[]  {  true,           true,               true              };
            string[] cellAlign = new string[]  {  "C",            "C",                "C"               };

            grdGT.SetBorderAndGridlineStyles();
            grdGT.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdGT.DefaultCellStyle.Font = new Font("맑은고딕", 24F, FontStyle.Bold);
            grdGT.RowTemplate.Height = 120;
            grdGT.SelectionMode = DataGridViewSelectionMode.FullRowSelect;

            grdGT.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 18F, FontStyle.Bold);
            grdGT.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void btnUp_Click(object sender, EventArgs e)
        {
            if (grdGT.CurrentRow == null)
            {
                return;
            }

            int rowindex = grdGT.CurrentRow.Index;
            grid_move(rowindex, "UP");
        }

        private void btnDown_Click(object sender, EventArgs e)
        {
            if (grdGT.CurrentRow == null)
            {
                return;
            }
            int rowindex = grdGT.CurrentRow.Index;
            grid_move(rowindex, "DOWN");
        }

        private void grid_move(int rowindex, string movetype)
        {
            if (movetype == "DOWN")
            {
                rowindex++;
                if (rowindex >= grdGT.Rows.Count)
                {
                    rowindex = 0;
                }
            }
            else if (movetype == "UP")
            {
                rowindex--;
                if (rowindex < 0)
                {
                    rowindex = grdGT.Rows.Count - 1;
                }
            }
            grdGT.CurrentCell = grdGT.Rows[rowindex].Cells[0];
            _gt = grdGT.Rows[rowindex].Cells["제품ID"].Value.ToString();
        }

        private void grdCT_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            int columnIndex = ((ExGrid)sender).CurrentCell.ColumnIndex;
            int rowIndex = ((ExGrid)sender).CurrentRow.Index;

            if (rowIndex >= 0)
            {
                _gt = grdGT.Rows[rowIndex].Cells["제품ID"].Value.ToString();
            }
        }

        private void btnPrint_Click(object sender, EventArgs e)
        {
            if(_gt == "")
            {
                frmMessage frm1 = new frmMessage("먼저 박스번호를 선택하여 주세요!", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", _gt, "", "", "Reprint", ref _BasicDs);
        }
    }
}
