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
    public partial class ucGanbanUse : UserControl
    {
        DataSet _BasicDs = new DataSet();
        DataTable _scanDt = new DataTable();
        DataTable _MainDt = new DataTable();

        public ucGanbanUse()
        {
            InitializeComponent();

            InitMainList();
            newScanDt();
        }

        #region Init Event

        //메인그리드
        private void InitMainList()
        {
            //                                    1           2           3         4             5        6      
            string[] headerText  = new string[] { "GanbanId", "ItemId", "ItemName", "CreateDate", "Qty",   "BoxQty" };
            string[] columnName  = new string[] { "GANBANID", "ITEMID", "ITEMNAME", "CREATEDATE", "QTY",   "POPCTQTY" };
            string[] columnType  = new string[] { "T",        "T",      "T",        "T",          "T",     "T"        };
                                                                                                   
            int[] columnWidth    = new int[]    { 195,        195,      195,        160,          150,     150        };
            bool[] columnVisible = new bool[]   { true,       true,     true,       true,         true,    false      };
            bool[] columnDisable = new bool[]   { true,       true,     true,       true,         true,    true       };
            string[] cellAlign   = new string[] { "L",        "L",      "L",        "C",          "C",     "C"        };

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

            _scanDt.Columns.Add("GANBANID");
            _scanDt.Columns.Add("SCANQTY");
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

            if (e.KeyCode == Keys.Enter)
            {
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

            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap1.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap1.Add("GANBAN_ID", ganban);

            paramsList1.Add(paramsMap1);

            string retvalue = "";

            //간판 정보 조회
            DataTable ganBodyDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_ganbanInfoForUseProcess.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

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

            DataRow[] drs = _scanDt.Select("GANBANID = '" + ganban + "'");

            if (drs.Length > 0)
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
            _scanDt.Rows.Add(ganban, ganBodyDt.Rows[0]["QTY"].ToString());
            //grdMain.RemoveAll();
            grdMain.DataBindDataSource(_MainDt, false, false);

        }
        #endregion


        #region 소진처리

        private void btnGanbanUse_Click(object sender, EventArgs e)
        {
            //스캔한 라벨들을 소진처리 하시겠습니까?
            frmMessage frm = new frmMessage("Do you want to exhaust the scanned labels?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                for (int i = 0; i < grdMain.Rows.Count; i++)
                {
                    string ganban = grdMain["GanbanId", i].Value.ToString();

                    //간판라벨 소진 처리
                    material_use_process(ganban);
                }
                //라벨 소진처리가 정상적으로 처리되었습니다.
                frmMessage frm3 = new frmMessage("Label burnout was successful.", "AUTOCLOSE");
                frm3.ShowDialog();

                txtSN.Text = "";
                grdMain.RemoveAll();
                _MainDt.Clear();
                newScanDt();

                txtSN_Focus();
            }
        }

        private void material_use_process(string ganban)
        {

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();

            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_GANBAN_ID", ganban);
            paramsMap.Add("P_USER_ID", clsStatic._USER_ID);

            paramsList.Add(paramsMap);

            string retvalue = "";

            //라벨 소진 처리
            DataTable resultDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_ganban_use_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (resultDt == null)
            {
                //라벨 소진처리가 정상적으로 처리되지 않았습니다.
                frmMessage frm1 = new frmMessage("Label burnout was not successful.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (resultDt.Rows.Count == 0)
            {
                //라벨 소진처리가 정상적으로 처리되지 않았습니다.
                frmMessage frm2 = new frmMessage("Label burnout was not successful.", "AUTOCLOSE");
                frm2.ShowDialog();
                txtSN_Focus();
                return;
            }
        }
        #endregion
    }
}
