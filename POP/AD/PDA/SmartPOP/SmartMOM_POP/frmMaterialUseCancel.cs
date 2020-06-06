using SmartMom_Lib;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SmartMOM_POP
{
    public partial class frmMaterialUseCancel : Form
    {
        DataTable _moveDt = new DataTable();
        DataTable _departureDt = new DataTable();
        DataTable _scanDt = new DataTable();
        DataTable _MainDt = new DataTable();
        DataSet _BasicDs = new DataSet();

        public frmMaterialUseCancel()
        {
            InitializeComponent();

            lblFromStock.Text = clsStatic._FROMLINE_DESC + "(" + clsStatic._FROMLINE + ")";
            CultureInfo cultures = CultureInfo.CreateSpecificCulture("ko-KR");

            newScanDt();
            InitGridList();

            btnSet_Click(null, null);
        }

        #region Init
        private void newScanDt()
        {
            _scanDt.Dispose();
            _scanDt = new DataTable();

            _scanDt.Columns.Add("GANBANID");
            _scanDt.Columns.Add("SCANQTY");
        }

        private void InitGridList()
        {
            //                                   0                  1            2          3            4         5
            string[] headerText = new string[] { "재발행여부",     "간판라벨",  "품목",    "품명",      "수량",    "간판타입"   }; 
            string[] columnName = new string[] { "REPRINT",        "GANBANID",  "ITEMID",  "ITEMNAME",  "QTY",     "GANBANTYPE" };
            string[] columnType = new string[] { "T",              "T",         "T",       "T",         "T",       "T"          };
                                                                                                                                                                                                                                                                                                                                  
            int[] columnWidth    = new int[]   { 150,              230,          230,      300,         150,       150          };
            bool[] columnVisible = new bool[]  { true,             true,         true,     true,        true,      false        };
            bool[] columnDisable = new bool[]  { true,             true,         true,     true,        true,      true         };
            string[] cellAlign = new string[]  { "C",              "C",          "C",      "L",         "R",       "C"          };
                                                                                                                                                                                                  
            grdMain.SetBorderAndGridlineStyles();
            grdMain.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdMain.DefaultCellStyle.Font = new Font("맑은고딕", 18);
            grdMain.DefaultCellStyle.ForeColor = Color.Black;
            grdMain.RowTemplate.Height = 70;

            grdMain.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 19, FontStyle.Bold);
            grdMain.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        #endregion

        #region 바코드 입력창 event
        /// <summary>
        /// 바코드 입력창 포커스
        /// </summary>
        private void txtSN_Focus()
        {
            txtSN.BackColor = Color.Yellow;
            txtSN.Focus();
            txtSN.SelectAll();
        }

        /// <summary>
        /// 바코드 입력창 포커스 잃을 경우
        /// </summary>
        private void txtSN_Leave(object sender, EventArgs e)
        {
            if (txtSN.Enabled == true)
            {
                txtSN.BackColor = Color.Red;
            }
        }

        /// <summary>
        /// 바코드 스캔
        /// </summary>
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
            //paramsMap1.Add("LOCATION_CD", clsStatic._FROMLINE);
            paramsMap1.Add("GANBAN_ID", ganban);

            paramsList1.Add(paramsMap1);

            string retvalue = "";

            //간판 정보 조회
            DataTable ganBodyDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_cancelGanbanInfo.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            if (ganBodyDt == null)
            {
                frmMessage frm1 = new frmMessage("입력한 간판번호가 존재하지 않거나 사용중인 간판라벨 입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (ganBodyDt.Rows.Count == 0)
            {
                frmMessage frm1 = new frmMessage("입력한 간판번호가 존재하지 않거나 사용중 또는 분할된 간판라벨 입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            string location = ganBodyDt.Rows[0]["LOCATIONCD"].ToString();

            if (clsStatic._FROMLINE != location)
            {
                frmMessage frm1 = new frmMessage($"{location} 창고에 등록된 간판라벨 입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (ganBodyDt.Rows[0]["BINID"].ToString() == "" || ganBodyDt.Rows[0]["BINID"].ToString() == null)
            {
                frmMessage frm1 = new frmMessage("입고처리되지 않은 간판라벨 입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            DataRow[] drs = _scanDt.Select("GANBANID = '" + ganban + "'");

            if (drs.Length > 0)
            {
                frmMessage frm1 = new frmMessage("이미 입력한 간판라벨입니다.", "AUTOCLOSE");
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


        private void txtSN_MouseClick(object sender, MouseEventArgs e)
        {
            if (txtSN.Enabled == true)
            {
                txtSN.BackColor = Color.Yellow;
            }
        }

        #endregion

        #region 그리드 Event

        private void grdMain_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            if(grdMain["재발행여부", e.RowIndex].Value.ToString() == "재발행")
            {
                grdMain["재발행여부", e.RowIndex].Value = "";
            }
            else
            {
                grdMain["재발행여부", e.RowIndex].Value = "재발행";
            }
        }

        private void grdMain_Color_change()
        {
            /*
            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                grdMain["품목", i].Style.Font = new Font("맑은고딕", 18, FontStyle.Bold);
                grdMain["품명", i].Style.Font = new Font("맑은고딕", 18, FontStyle.Bold);
                grdMain["규격", i].Style.Font = new Font("맑은고딕", 18, FontStyle.Bold);

                grdMain["잔량", i].Style.Font = new Font("맑은고딕", 20, FontStyle.Bold | FontStyle.Underline);
                grdMain["잔량", i].Style.BackColor = Color.DodgerBlue;

                grdMain["스캔수량", i].Style.Font = new Font("맑은고딕", 20, FontStyle.Bold | FontStyle.Underline);
                grdMain["스캔수량", i].Style.BackColor = Color.DodgerBlue;

                int remainQty = int.Parse(grdMain["잔량", i].Value.ToString());
                int scanQty = int.Parse(grdMain["스캔수량", i].Value.ToString());
                if (remainQty <= scanQty)
                {
                    for (int j = 0; j < grdMain.Columns.Count; j++)
                    {
                        grdMain[j, i].Style.ForeColor = Color.Red;
                    }
                }
                else
                {
                    for (int j = 0; j < grdMain.Columns.Count; j++)
                    {
                        grdMain[j, i].Style.ForeColor = Color.Black;
                    }
                }
            }
            */
        }

        #endregion

        #region 간판라벨 소진취소 처리 Event
        /// <summary>
        /// 소진처리 버튼 클릭
        /// </summary>
        private void btnMaterialUse_Click(object sender, EventArgs e)
        {
            frmMessage frm = new frmMessage("스캔한 간판라벨들을 소진취소 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                string labelSeq = get_ganbanSeq();
                int printCnt = 0;

                for (int i = 0; i < grdMain.Rows.Count; i++)
                {
                    string ganban = grdMain["간판라벨", i].Value.ToString();
                    string ganbanType = grdMain["간판타입", i].Value.ToString();
                    string rePrint = "";
                    if (grdMain["재발행여부", i].Value.ToString() == "재발행")
                    {
                        rePrint = "Y";
                        printCnt++;
                    }
                    else
                    {
                        rePrint = "N";
                    }
                    
                    //간판라벨 소진 처리
                    material_use_cancel(ganban, ganbanType, rePrint, labelSeq);
                }

                //재발행 대상이 있으면 라벨 프린트 실행

                if (printCnt > 0)
                {
                    ganban_print(labelSeq);
                }

                frmMessage frm3 = new frmMessage("간판라벨 소진취소가 정상적으로 처리었습니다.", "AUTOCLOSE");
                frm3.ShowDialog();

                txtSN.Text = "";
                grdMain.RemoveAll();
                _MainDt.Clear();
                newScanDt();

                txtSN_Focus();
            }            
        }

        //간판라벨 tmp id
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

        //소진취소 처리 프로시저 호출
        private void material_use_cancel (string ganban, string ganbanType, string rePrint, string labelSeq)
        {

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();

            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_LOCATION_CD", clsStatic._FROMLINE);
            paramsMap.Add("P_GANBAN_ID", ganban);
            paramsMap.Add("P_USER_ID", clsStatic._USER_ID);
            paramsMap.Add("P_LABEL_ID", labelSeq);
            paramsMap.Add("P_REPRINT_YN", rePrint);

            //간판라벨 타입에 따라 프린트정보 설정
            if(ganbanType == "DP") //원부자재
            {
                paramsMap.Add("P_PRINT_IP", clsStatic._GANBANPRINT);
            }
            else if(ganbanType == "BUTTON") //내부라벨(SMT공정)
            {
                paramsMap.Add("P_PRINT_IP", clsStatic._CTPRINT);
            }


            paramsList.Add(paramsMap);

            string retvalue = "";

            //간판 정보 조회
            DataTable resultDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_ganban_use_cancel_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (resultDt == null)
            {
                frmMessage frm1 = new frmMessage("간판라벨 소진취소가 정상적으로 처리되지 않았습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (resultDt.Rows.Count == 0)
            {
                frmMessage frm2 = new frmMessage("간판라벨 소진취소가 정상적으로 처리되지 않았습니다.", "AUTOCLOSE");
                frm2.ShowDialog();
                txtSN_Focus();
                return;
            }

            
        }

        //라벨 프린트 호출
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
                string ganbanType = checkDt.Rows[i]["GANBANTYPE"].ToString();

                if (ganbanType == "DP")
                {
                    clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", "", checkDt.Rows[i]["GANBANID"].ToString(), "", ref _BasicDs);
                }
                else if (ganbanType == "BUTTON")
                {
                    clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", checkDt.Rows[i]["GANBANID"].ToString(), "", "", ref _BasicDs);
                }
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
        #endregion

        #region 화면 상단 Control Event
        /// <summary>
        /// 닫기 버튼 클릭
        /// </summary>
        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void btnSet_Click(object sender, EventArgs e)
        {
            txtSN_Focus();
        }
        #endregion

        #region 화면 하단 Control Event
        /// <summary>
        /// 스캔리스트 버튼 클릭
        /// </summary>
        private void btnScanList_Click(object sender, EventArgs e)
        {
            frmScanView frm1 = new frmScanView(_scanDt, "간판라벨소진");
            frm1.ShowDialog();
        }

        /// <summary>
        /// 간판라벨 발행(Split) 버튼 클릭
        /// </summary>
        private void btnManualPrint_Click(object sender, EventArgs e)
        {
            frmGanbanSplit frm = new frmGanbanSplit();
            frm.ShowDialog();
        }

        /// <summary>
        /// 화면 초기화 버튼 클릭
        /// </summary>
        private void btnPageInit_Click(object sender, EventArgs e)
        {
            frmMessage frm = new frmMessage("현재 화면을 초기화 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                txtSN.Text = "";
                grdMain.RemoveAll();
                _MainDt.Clear();
                newScanDt();

                txtSN_Focus();
            }
        }

        #endregion

        private void button1_Click(object sender, EventArgs e)
        {
            frmMaterialUseSearch frm = new frmMaterialUseSearch("N");
            frm.ShowDialog();
        }
    }
}
