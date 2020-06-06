using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using SmartMom_Lib;
using System.Globalization;
using System.Threading;

namespace SmartMOM_POP
{
    public partial class ucGanbanInput : UserControl
    {
        DataSet _BasicDs = new DataSet();
        DataTable _scanDt = new DataTable();
        DataTable _MainDt = new DataTable();
        DataTable _BomDt = new DataTable();

        bool _search_open_flag = false;

        public ucGanbanInput(string workorder = "")
        {
            InitializeComponent();

            InitMainList();
            newScanDt();

            if(workorder != "")
            {
                getWorkOrder(workorder);
            }
        }

        #region Init Event

        //메인그리드
        private void InitMainList()
        {
            //                                    1              2           3         4           5 
            string[] headerText  = new string[] { "WorkOrderId", "GanbanId", "ItemId", "ItemName", "Qty"};
            string[] columnName  = new string[] { "WORKORDERID", "GANBANID", "ITEMID", "ITEMNAME", "QTY"};
            string[] columnType  = new string[] { "T",           "T",        "T",      "T",        "T"  };
                                                                                                    
            int[] columnWidth    = new int[]    { 195,           195,        195,      160,        150  };
            bool[] columnVisible = new bool[]   { true,          true,       true,     true,       false};
            bool[] columnDisable = new bool[]   { true,          true,       true,     true,       false};
            string[] cellAlign   = new string[] { "L",           "L",        "L",      "C",        "C"  };

            grdMain.SetBorderAndGridlineStyles();
            grdMain.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdMain.DefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdMain.RowTemplate.Height = 50;

            grdMain.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdMain.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        private void newScanDt()
        {
            _scanDt.Dispose();
            _scanDt = new DataTable();

            _scanDt.Columns.Add("WORKORDERID");
            _scanDt.Columns.Add("GANBANID");
        }

        #endregion

        #region 상단 Condition 영역 Event
        //화면 초기화
        private void btnInit_Click(object sender, EventArgs e)
        {
            //화면을 초기화 하시겠습니까?
            frmMessage frm = new frmMessage("Do you want to reset the screen?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                init();
            }
        }

        public void init()
        {
            grdMain.RemoveAll();
            _MainDt.Clear();
            newScanDt();
            lblWorkOrderId.Text = "";
            lblItemId.Text = "";
            txtSN.Text = "";
            txtSN_Focus();
        }

        // set 클릭
        private void btn_set_Click(object sender, EventArgs e)
        {
            txtSN.BackColor = Color.Yellow;
            txtSN.Focus();
            txtSN.SelectAll();
        }

        
        // 입력창 떠남
        private void txtSN_Leave(object sender, EventArgs e)
        {
            if (txtSN.Enabled == true)
            {
                txtSN.BackColor = Color.Red;
            }
        }

        // 입력창 클릭
        private void txtSN_MouseClick(object sender, MouseEventArgs e)
        {
            if (txtSN.Enabled == true)
            {
                txtSN.BackColor = Color.Yellow;
            }
        }

        // 입력창 포커싱
        private void txtSN_Focus()
        {
            txtSN.BackColor = Color.Yellow;
            txtSN.Focus();
            txtSN.SelectAll();
        }

        #endregion

        #region 라벨 스캔 Event

        // 입력창 입력 완료
        private void txtSN_KeyDown(object sender, KeyEventArgs e)
        {

            if(e.KeyCode == Keys.Enter)
            {
                if (clsStatic._RESOURCE_CD == "")
                {
                    //설비가 선택되지 않았습니다.
                    frmMessage frm1 = new frmMessage("No resource is selected.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    txtSN_Focus();
                    return;
                }

                if(lblWorkOrderId.Text == "")
                {
                    //작업지시서가 선택되지 않았습니다.
                    frmMessage frm1 = new frmMessage("No workorder is selected.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    txtSN_Focus();
                    return;
                }

                if (txtSN.Text.Trim() == "")
                {
                    return;
                }
                else
                {
                    add_Ganban();
                }
                txtSN_Focus();
            }
        }

        /// <summary>
        /// 스캔한 간판 수량 등록
        /// </summary>
        private void add_Ganban()
        {
            string ganban = "";
            ganban = txtSN.Text.Trim();

            string workorderid = "";
            workorderid = lblWorkOrderId.Text.Trim();

            DataTable chkDt = check_input_ganban(lblWorkOrderId.Text);

            if (chkDt != null)
            {
                DataRow[] dr1 = chkDt.Select("GANBANID = '" + ganban + "'");

                if (dr1.Length > 0)
                {
                    //이미 투입된 간판라벨입니다.
                    frmMessage frm1 = new frmMessage("The Ganban label has already been put in.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    txtSN_Focus();
                    return;
                }
            }

            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap1.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap1.Add("GANBAN_ID", ganban);
            paramsMap1.Add("WORK_ORDER_ID", lblWorkOrderId.Text);

            paramsList1.Add(paramsMap1);

            string retvalue = "";

            //간판 정보 조회
            DataTable ganBodyDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_ganbanInfoForMatInput.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            if (ganBodyDt == null)
            {
                //입력한 라벨이 존재하지 않거나 사용 불가 처리 된 라벨 입니다.
                frmMessage frm1 = new frmMessage("The label entered does not exist or has been disabled.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (ganBodyDt.Rows.Count == 0)
            {
                //입력한 라벨이 존재하지 않거나 사용 불가 처리 된 라벨 입니다.
                frmMessage frm1 = new frmMessage("The label entered does not exist or has been disabled.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }
            
            string itemId = ganBodyDt.Rows[0]["ITEMID"].ToString();
            DataRow[] dr2 = _BomDt.Select("CHILDITEMID ='"+ itemId + "'");

            if (dr2.Length < 1)
            {
                //하위 BOM에 속하지 않은 자재입니다.
                frmMessage frm1 = new frmMessage("The material does not belong to the child BOM.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            DataRow[] dr3 = _scanDt.Select("GANBANID = '" + ganban + "' AND WORKORDERID = '" + lblWorkOrderId.Text + "'");

            if (dr3.Length > 0)
            {
                //이미 입력한 간판라벨입니다.
                frmMessage frm1 = new frmMessage("This GANBAN label has already been entered.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }


            if (_MainDt.Columns.Count == 0)
            {
                _MainDt = ganBodyDt.Clone();
            }

            _MainDt.ImportRow(ganBodyDt.Rows[0]);
            _scanDt.Rows.Add(lblWorkOrderId.Text, ganban);
            //grdMain.RemoveAll();
            grdMain.DataBindDataSource(_MainDt, false, false);

        }

        //
        private DataTable check_input_ganban(string workorderid)
        {
            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap1.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap1.Add("WORK_ORDER_ID", workorderid);

            paramsList1.Add(paramsMap1);

            string retvalue = "";

            //간판 정보 조회
            DataTable chkDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_wo_input_label.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            if (chkDt == null)
            {
                return null;
            }

            if (chkDt.Rows.Count == 0)
            {
                return null;
            }

            return chkDt;
        }
        #endregion

        #region 투입처리

        private void btnGanbanUse_Click(object sender, EventArgs e)
        {
            //스캔한 라벨들을 자재투입 처리 하시겠습니까?
            frmMessage frm = new frmMessage("Do you want to material input process the scanned label?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                for (int i = 0; i < grdMain.Rows.Count; i++)
                {
                    string ganban = grdMain["GanbanId", i].Value.ToString();
                    string workorderid = grdMain["WorkOrderId", i].Value.ToString();

                    //자재투입 처리
                    mat_input_process(ganban, workorderid);
                }
                //자재 투입 처리가 완료되었습니다.
                frmMessage frm3 = new frmMessage("Material input processing is complete.", "AUTOCLOSE");
                frm3.ShowDialog();

                txtSN.Text = "";
                grdMain.RemoveAll();
                _MainDt.Clear();
                newScanDt();

                txtSN_Focus();
            }
        }

        private void mat_input_process(string ganban, string workorderid)
        {

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();

            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_GANBAN_ID", ganban);
            paramsMap.Add("P_WORKORDER_ID", workorderid);
            paramsMap.Add("P_USER_ID", clsStatic._USER_ID);

            paramsList.Add(paramsMap);

            string retvalue = "";

            //자재 투입 처리
            DataTable resultDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_material_input_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (resultDt == null)
            {
                //자재 투입 처리가 정상적으로 처리되지 않았습니다.
                frmMessage frm1 = new frmMessage("Material input processing did not process successfully.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (resultDt.Rows.Count == 0)
            {
                //자재 투입 처리가 정상적으로 처리되지 않았습니다.
                frmMessage frm2 = new frmMessage("Material input processing did not process successfully.", "AUTOCLOSE");
                frm2.ShowDialog();
                txtSN_Focus();
                return;
            }
        }
        #endregion

        #region 작업지시서 선택 

        //작업지시서 리스트 팝업 오픈
        private void lblWorkOrderId_Click(object sender, EventArgs e)
        {
            string tmpWorkorderid = clsStatic._WORK_ORDER_ID;
            clsStatic._WORK_ORDER_ID = "";

            _search_open_flag = true;


            frmPOSearch frm = new frmPOSearch("ALL");
            frm.ShowDialog();

            _search_open_flag = false;

            // 작업지시서 가 선택된 경우
            if (clsStatic._WORK_ORDER_ID != "")
            {
                // 작업지시서 조회
                getWorkOrder(clsStatic._WORK_ORDER_ID);
            }
            else
            {
                clsStatic._WORK_ORDER_ID = tmpWorkorderid;
            }

            txtSN_Focus();
        }

        private void getWorkOrder(string workorderid)
        {
            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap1.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap1.Add("WORK_ORDER_ID", workorderid);

            paramsList1.Add(paramsMap1);

            string retvalue = "";

            //간판 정보 조회
            DataTable woDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_workorder.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            if (woDt == null)
            {
                //입력한 라벨이 존재하지 않거나 사용 불가 처리 된 라벨 입니다.
                frmMessage frm1 = new frmMessage("The label entered does not exist or has been disabled.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (woDt.Rows.Count == 0)
            {
                //입력한 라벨이 존재하지 않거나 사용 불가 처리 된 라벨 입니다.
                frmMessage frm1 = new frmMessage("The label entered does not exist or has been disabled.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            _BomDt = woDt;
            lblWorkOrderId.Text = woDt.Rows[0]["WORKORDERID"].ToString();
            lblItemId.Text = woDt.Rows[0]["ITEMID"].ToString();
        }
        #endregion
    }
}
