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
    public partial class frmCTReprint : Form
    {
        string _ct = "";
        string _gtType = "";
        string _ctType = "";
        DataTable _gt_DesignDt = new DataTable();
        DataTable _ct_DesignDt = new DataTable();
        DataSet _BasicDs = new DataSet();
        public frmCTReprint(DataTable dt, string gtType, string ctType, DataTable gt_DesignDt, DataTable ct_DesignDt, DataSet BasicDs)
        {
            InitializeComponent();

            _gtType = gtType;
            _ctType = ctType;
            _gt_DesignDt = gt_DesignDt;
            _ct_DesignDt = ct_DesignDt;

            InitCTList();

            grdCT.DataBindDataSource(dt, false, false);
        }

        private void InitCTList()
        {
            //                                   0                         
            string[] headerText = new string[] {  "박스포장번호", "구성수량"        }; //2
            string[] columnName = new string[] { "CT",            "QTY"         };
            string[] columnType = new string[] {  "T",            "T"               };
                                                              
            int[] columnWidth    = new int[]   { 700,             300               };
            bool[] columnVisible = new bool[]  {  true,           true              };
            bool[] columnDisable = new bool[]  {  true,           true              };
            string[] cellAlign = new string[]  {  "C",            "C"               };

            grdCT.SetBorderAndGridlineStyles();
            grdCT.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdCT.DefaultCellStyle.Font = new Font("맑은고딕", 24F, FontStyle.Bold);
            grdCT.RowTemplate.Height = 80;
            grdCT.SelectionMode = DataGridViewSelectionMode.FullRowSelect;

            grdCT.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 18F, FontStyle.Bold);
            grdCT.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void btnUp_Click(object sender, EventArgs e)
        {
            int rowindex = grdCT.CurrentRow.Index;
            grid_move(rowindex, "UP");
        }

        private void btnDown_Click(object sender, EventArgs e)
        {
            int rowindex = grdCT.CurrentRow.Index;
            grid_move(rowindex, "DOWN");
        }

        private void grid_move(int rowindex, string movetype)
        {
            if (movetype == "DOWN")
            {
                rowindex++;
                if (rowindex >= grdCT.Rows.Count)
                {
                    rowindex = 0;
                }
            }
            else if (movetype == "UP")
            {
                rowindex--;
                if (rowindex < 0)
                {
                    rowindex = grdCT.Rows.Count - 1;
                }
            }
            grdCT.CurrentCell = grdCT.Rows[rowindex].Cells[0];
            _ct = grdCT.Rows[rowindex].Cells["박스포장번호"].Value.ToString();
        }

        private void grdCT_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            int columnIndex = ((ExGrid)sender).CurrentCell.ColumnIndex;
            int rowIndex = ((ExGrid)sender).CurrentRow.Index;

            if (rowIndex >= 0)
            {
                _ct = grdCT.Rows[rowIndex].Cells["박스포장번호"].Value.ToString();
            }
        }

        private void btnPrint_Click(object sender, EventArgs e)
        {
            if(_ct == "")
            {
                frmMessage frm1 = new frmMessage("먼저 박스번호를 선택하여 주세요!", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            string retbuf = "";
            retbuf = get_ganbanSeq();

            if (retbuf == "NG")
            {
                frmMessage frm1 = new frmMessage("현재 라벨발행 진행중입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_runCount", "");
            paramsMap.Add("p_ganbanid", "");
            paramsMap.Add("P_LABEL_ID", retbuf);
            paramsMap.Add("P_IP_ADDRESS", clsStatic._GANBANPRINT);
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_GANBAN_ID", _ct);

            paramsList.Add(paramsMap);
            string retvalue = "";
            DataTable ganbanAddDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_ganbantmpinsert_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            ganban_print(retbuf);

            //frmBadProductInsert frm = new frmBadProductInsert("박스라벨 재발행", "", _ct, "CT", clsStatic._MACADDRESS, _gtType, _ctType, _gt_DesignDt, _ct_DesignDt, _BasicDs);
            //frm.ShowDialog();
        }

        private string get_ganbanSeq()
        {
            string retvalue = "";
            string retbuf = "";

            List<Dictionary<string, object>> paramsCheckList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsCheckMap = new Dictionary<string, object>();
            paramsCheckMap.Add("p_err_code", "");
            paramsCheckMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsCheckMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsCheckMap.Add("IP_ADDRESS", clsStatic._CTPRINT);

            paramsCheckList.Add(paramsCheckMap);

            DataTable checkDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getGanbanCheck.dummy", paramsCheckList, clsStatic._serviceSelectURL, ref retvalue);

            if (checkDt == null)
            {
                return "NG";
            }

            if (checkDt.Rows.Count <= 0)
            {
                return "NG";
            }

            if (int.Parse(checkDt.Rows[0]["LABELCNT"].ToString().Trim()) > 0)
            {
                return "NG";
            }

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");

            paramsList.Add(paramsMap);

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getGanbanseq.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            if (dt == null)
            {
                return "NG";
            }

            if (dt.Rows.Count <= 0)
            {
                return "NG";
            }

            retbuf = dt.Rows[0]["GANBANSEQ"].ToString().Trim();

            return retbuf;

        }

        // 동일 labelid(tmp 테이블 구분자) 발행
        private void ganban_print(string labelid)
        {
            List<Dictionary<string, object>> paramsCheckList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsCheckMap = new Dictionary<string, object>();
            paramsCheckMap.Add("p_err_code", "");
            paramsCheckMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsCheckMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsCheckMap.Add("LABEL_ID", labelid);

            paramsCheckList.Add(paramsCheckMap);
            string retvalue = "";
            DataTable checkDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getGanbanPrintList.dummy", paramsCheckList, clsStatic._serviceSelectURL, ref retvalue);

            if (checkDt == null)
            {
                frmMessage frm1 = new frmMessage("출력할 간판라벨이 없습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            if (checkDt.Rows.Count <= 0)
            {
                frmMessage frm1 = new frmMessage("출력할 간판라벨이 없습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            for (int i = 0; i < checkDt.Rows.Count; i++)
            {
                clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", checkDt.Rows[i]["GANBANID"].ToString(), "", "", ref _BasicDs);
            }

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_runCount", "");
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_LABEL_ID", labelid);

            paramsList.Add(paramsMap);

            DataTable ganbanAddDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.deleteGanbanTmp.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

        }

    }
}
