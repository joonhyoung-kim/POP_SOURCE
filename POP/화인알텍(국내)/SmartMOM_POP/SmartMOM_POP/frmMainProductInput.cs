using SmartMom_Lib;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SmartMOM_POP
{
    public partial class frmMainProductInput : Form
    {
        DataTable _ganban_DesignDt = new DataTable();
        DataSet _BasicDs = new DataSet();

        DataTable _ganHeadDt = new DataTable();
        DataTable _ganBodyDt = new DataTable();
        DataTable _itemDt = new DataTable();
        DataTable _woDt = new DataTable();

        int _makeGanban = 0;
        int _allqty = 0;
        int _makeqty = 0;
        string _fromDesc = "";
        string _pa_vendor_id = "";
        string _ganbanType = "";
        string _sn = "";
        string _stockid = "";

        public frmMainProductInput()
        {
            InitializeComponent();

            InitGanbanList();

            _BasicDs = clsLabelSet.basic_info_search(clsStatic._MACADDRESS);

            lblFrom.Text = clsStatic._FROMLINE_DESC + "(" + clsStatic._FROMLINE + ")";
            lblTo.Text = clsStatic._TOLINE_DESC + "(" + clsStatic._TOLINE + ")";

            serialButton1.DataReceived += SerialButton1_DataReceived;

            try
            {
                serialButton1.PortName = clsStatic._PUSHBUTTON1;
                serialButton1.Open();
            }
            catch
            {

            }

            if (serialButton1.IsOpen == true)
            {
                lblButton1.BackColor = Color.ForestGreen;
                lblButton1.Text = "버튼1(동작중)";
            }
            else
            {
                lblButton1.BackColor = Color.Tomato;
                lblButton1.Text = "버튼1(멈춤)";
            }
        }

        private void SerialButton1_DataReceived(object sender, System.IO.Ports.SerialDataReceivedEventArgs e)
        {
            string buf = serialButton1.ReadLine();
            buf = buf.Replace("\r", "");

            if (buf == "1")
            {
                this.Invoke(new MethodInvoker(delegate ()
                {
                    if (clsStatic._WORK_ORDER_ID != "")
                    {
                        printAndMove();
                    }
                }
                ));
            }
        }

        private void InitGanbanList()
        {
            //                                   0               1               2                   3              4                 5                6                7                8               9           10           11             
            string[] headerText = new string[] { "사용여부",     "간판라벨번호", "발주번호",         "W/O",         "FROM창고",       "현재창고",      "이동일자",      "이동담당자",    "박스포장번호", "구성수량", "생성자",   "생성일자"    }; //12
            string[] columnName = new string[] { "USEYN",        "GANBANID",     "DEPARTUREGROUPID", "WORKORDERID", "FROMSLOC",       "SLOC",          "MOVEDATE",      "MOVEBY",        "CT",           "GOODQTY",  "NAME",     "CREATEDATE"  };
            string[] columnType = new string[] { "T",            "T",            "T",                "T",           "T",              "T",             "T",             "T",              "T",            "T",        "T",         "T"          };
                                                                                                                                                                                                                                               
            int[] columnWidth    = new int[]   {  150,            150,            250,                200,           250,              250,             250,             250,             150,            150,         200,        250          };
            bool[] columnVisible = new bool[]  {  true,           true,           true,               true,          true,             true,            true,            true,            true,           true,        true,       true         };
            bool[] columnDisable = new bool[]  {  true,           true,           true,               true,          true,             true,            true,            true,            true,           true,        true,       true         };
            string[] cellAlign = new string[]  { "C",            "C",            "C",                 "C",           "C",              "C",             "C",             "C",             "C",            "C",         "C",        "C"          };
                                                             
            grdGanban.SetBorderAndGridlineStyles();
            grdGanban.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdGanban.DefaultCellStyle.Font = new Font("맑은고딕", 15, FontStyle.Bold);
            grdGanban.RowTemplate.Height = 80;

            grdGanban.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 20F, FontStyle.Bold);
            grdGanban.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        private void init_process()
        {
            lblPlanQty.Text = "";
            lblSPECIFICATION.Text = "";
            _stockid = "";

            _itemDt.Rows.Clear();
            lblGanbanQty.Text = "";
            lblPossibleQty.Text = "";
            lblLabelID.Text = "";

            lblItem.Text = "";
            lblItemDesc.Text = "";
            lblLabelID.Text = "";
            lblSPECIFICATION.Text = "";


            _woDt.Dispose();
            _woDt = new DataTable();
            _ganBodyDt.Dispose();
            _ganBodyDt = new DataTable();
            


            grdGanban.RemoveAll();

        }

        private void wo_ganban_body_search()
        {
            grdGanban.RemoveAll();

            string palletid = "";
            string ct = "";
            string ganban = "";

            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap1.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap1.Add("WORK_ORDER_ID", clsStatic._WORK_ORDER_ID); 
            paramsMap1.Add("PALLETID", palletid);
            paramsMap1.Add("CT", ct);
            paramsMap1.Add("GANBAN_ID", ganban);
            paramsMap1.Add("dateFlag", "");
            paramsMap1.Add("USE_YN", "");

            paramsList1.Add(paramsMap1);

            string retvalue = "";

            _ganBodyDt.Dispose();
            _ganBodyDt = new DataTable();
            _ganBodyDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getGanbanBodyList.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            _makeqty = 0;
            if (_ganBodyDt == null)
            {
                lblGanbanQty.Text = _makeqty.ToString("###,##0");
                lblPossibleQty.Text = (int.Parse(lblPlanQty.Text.Replace(",", "")) - int.Parse(lblGanbanQty.Text.Replace(",", "")) + _makeGanban).ToString("###,##0");
                return;
            }

            if (_ganBodyDt.Rows.Count == 0)
            {
                lblGanbanQty.Text = _makeqty.ToString("###,##0");
                lblPossibleQty.Text = (int.Parse(lblPlanQty.Text.Replace(",", "")) - int.Parse(lblGanbanQty.Text.Replace(",", "")) + _makeGanban).ToString("###,##0");
                return;
            }
            
            grdGanban.DataBindDataSource(_ganBodyDt, false, false);
            _makeqty = 0;
            for (int i =0;i<_ganBodyDt.Rows.Count;i++)
            {
                if (_ganBodyDt.Rows[i]["USEYN"].ToString().Trim() == "Y")
                {
                    _makeqty += int.Parse(_ganBodyDt.Rows[i]["GOODQTY"].ToString().Trim());
                }
            }
            lblGanbanQty.Text = _makeqty.ToString("###,##0");

            lblPossibleQty.Text = (int.Parse(lblPlanQty.Text.Replace(",", "")) -int.Parse(lblGanbanQty.Text.Replace(",", ""))).ToString("###,##0");

        }

        private void item_bind()
        {
            _allqty = 0;
            string buf = "";
            for(int i=0;i<_ganHeadDt.Rows.Count;i++)
            {
                _allqty += int.Parse(_ganHeadDt.Rows[i]["GOODQTY"].ToString().Trim());
            }

            lblPlanQty.Text = _allqty.ToString("###,##0");
        }

        private string ganbanCheck()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_sloc", "");
            paramsMap.Add("p_ganbantype", "");
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD",  clsStatic._COMPANY_CD);
            paramsMap.Add("P_SN",          "txtSN.Text.Trim()");
            paramsList.Add(paramsMap);
            string retvalue = "";
            DataTable snDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_ganbancheck_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (snDt == null)
            {
                frmMessage frm1 = new frmMessage("입력한 SN의 타입이 정상적으로 리턴되지 않았습니다!", "AUTOCLOSE");
                frm1.ShowDialog();
                return "NODATA";
            }

            if (snDt.Rows.Count == 0)
            {
                frmMessage frm2 = new frmMessage("입력한 SN의 타입이 정상적으로 리턴되지 않았습니다!", "AUTOCLOSE");
                frm2.ShowDialog();
                return "NODATA";
            }

            string ganbanType = snDt.Rows[0]["p_ganbantype"].ToString();

            return ganbanType;
        }


        private void btnInit_Click(object sender, EventArgs e)
        {
            frmMessage frm = new frmMessage("화면을 초기화 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                init_process();
            }
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            frmMessage frm = new frmMessage("간판라벨발행 화면을 종료 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                this.Close();
            }
        }

        private void btnGanbanSet_Click(object sender, EventArgs e)
        {
            clsStatic._dialogValue = "";

            frmLoginIDInsert frm = new frmLoginIDInsert(_makeGanban.ToString());
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                _makeGanban = int.Parse(clsStatic._dialogValue);

                btnGanbanSet.Text = "간반구성 : " + _makeGanban.ToString("###,##0");
                btnGanbanSet.BackColor = Color.DarkOrange;
                clsStatic._dialogValue = "";
            }
        }

        private string get_moveCheck()
        {
            string retvalue = "";
            string retbuf = "";

            List<Dictionary<string, object>> paramsCheckList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsCheckMap = new Dictionary<string, object>();
            paramsCheckMap.Add("p_err_code", "");
            paramsCheckMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsCheckMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);

            paramsCheckList.Add(paramsCheckMap);

            DataTable checkDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getMoveseqCheck.dummy", paramsCheckList, clsStatic._serviceSelectURL, ref retvalue);

            if (checkDt == null)
            {
                return "NG";
            }

            if (checkDt.Rows.Count <= 0)
            {
                return "NG";
            }

            if (int.Parse(checkDt.Rows[0]["MOVECNT"].ToString().Trim()) > 0)
            {
                return "NG";
            }

            return "OK";
        }

        private string get_moveSeq()
        {
            string retvalue = "";
            string retbuf = "";

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");

            paramsList.Add(paramsMap);

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getMoveseq.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            if (dt == null)
            {
                return "NG";
            }

            if (dt.Rows.Count <= 0)
            {
                return "NG";
            }

            retbuf = dt.Rows[0]["MOVESEQ"].ToString().Trim();

            return retbuf;

        }

        private void btnLabelPrint_Click(object sender, EventArgs e)
        {
            printAndMove();
        }

        private void printAndMove()
        {
            string movecheck = get_moveCheck();

            if (movecheck == "NG")
            {
                frmMessage frm1 = new frmMessage("현재 이동처리가 진행중입니다. 잠시후 이동처리 진행 하여 주세요.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }
            insertGanban();
        }

        private void insertGanban()
        {
            if (_makeGanban <= 0)
            {
                frmMessage frm1 = new frmMessage("간판라벨 수량을 입력하여 주세요!", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            if (_makeGanban > int.Parse(lblPossibleQty.Text.Replace(",", "")))
            {
                frmMessage frm1 = new frmMessage("간판라벨 수량이 총수량보다 많습니다!", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }
            string ganban_id = make_ganban(_makeGanban.ToString());

            if (ganban_id == "" || ganban_id == "NG")
            {
                frmMessage frm1 = new frmMessage("간판라벨이 발행되지 않았습니다. 관리자에게 문의하여 주세요!", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }
            string move_id = get_moveSeq();
            move_label_tmp_insert(move_id, ganban_id);
            move_item_tmp_insert(move_id, lblItem.Text, _makeGanban, "대차이동");


            move_transfer(move_id);


            wo_ganban_body_search();
        }

        private void move_label_tmp_insert(string move_id, string movekeycol)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("MOVE_ID", move_id);
            paramsMap.Add("TO_LOCATION_CD", clsStatic._TOLINE);
            paramsMap.Add("TRANSFER_FLAG", "WAIT");
            paramsMap.Add("MOVEKEYCOL", movekeycol);
            paramsMap.Add("CREATE_BY", clsStatic._USER_ID);


            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_labelPopMoveTmp.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);
        }

        private void move_item_tmp_insert(string move_id, string item_id, int qty, string desc)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("MOVE_ID", move_id);
            paramsMap.Add("TRANSFER_FLAG", "WAIT");
            paramsMap.Add("ITEM_ID", item_id);
            paramsMap.Add("QTY", qty);
            paramsMap.Add("FROM_LOCATION_CD", clsStatic._FROMLINE);
            paramsMap.Add("TO_LOCATION_CD", clsStatic._TOLINE);
            paramsMap.Add("STOCK_TYPE", clsStatic._STOCK_TYPE);
            paramsMap.Add("DESCRIPTION", desc);
            paramsMap.Add("CREATE_BY", clsStatic._USER_ID);


            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_itemPopMoveTmp.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);
        }

        private void move_transfer(string move_id)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_STOCK_TYPE", clsStatic._STOCK_TYPE);
            paramsMap.Add("P_MOVE_ID", move_id);
            paramsMap.Add("TO_LOCATION_CD", clsStatic._TOLINE);
            paramsMap.Add("P_MODIFIER", clsStatic._USER_ID);
            paramsList.Add(paramsMap);
            string retvalue = "";
            DataTable moveDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_move_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (moveDt == null)
            {
                frmMessage frm1 = new frmMessage("이동처리가 정상적으로 처리되지 않았습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            if (moveDt.Rows.Count == 0)
            {
                frmMessage frm2 = new frmMessage("이동처리가 정상적으로 처리되지 않았습니다.", "AUTOCLOSE");
                frm2.ShowDialog();
                return;
            }

            frmMessage frm3 = new frmMessage("이동처리가 정상적으로 처리었습니다.", "AUTOCLOSE");
            frm3.ShowDialog();
            return;
        }

        private string make_ganban(string makeGanban)
        {
            string pallet = "-";
            string ct = "-";
            string ganban = "-";
            string make_ganban_id = "";

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_runCount", "");
            paramsMap.Add("p_ganbanid", "");
            paramsMap.Add("P_DIVISION_CD",        clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD",         clsStatic._COMPANY_CD);
            paramsMap.Add("P_ITEM_ID",            lblItem.Text);
            paramsMap.Add("P_DEPARTURE_GROUP_ID", "-");
            paramsMap.Add("P_WORK_ORDER_ID",      clsStatic._WORK_ORDER_ID);
            paramsMap.Add("P_PALLETID",           pallet);
            paramsMap.Add("P_CT",                 ct);
            paramsMap.Add("P_GOOD_QTY",           makeGanban);
            paramsMap.Add("P_FROM_SLOC",          "-");
            paramsMap.Add("P_SLOC",               clsStatic._TOLINE);
            paramsMap.Add("P_VENDOR_CD",          "-");
            paramsMap.Add("P_DESCRIPTION",        "대차처리시 재고이동용 간판발행");
            paramsMap.Add("P_PA_GANBAN_ID",       ganban);
            paramsMap.Add("P_CREATE_BY",          clsStatic._USER_ID);

            paramsList.Add(paramsMap);
            string retvalue = "";
            DataTable ganbanAddDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_ganbaninsert_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if(ganbanAddDt == null)
            {
                frmMessage frm1 = new frmMessage("간판라벨 생성이 실패했습니다.(" + ganbanAddDt.Rows[0]["p_err_msg"].ToString() + ")", "AUTOCLOSE");
                frm1.ShowDialog();
                return "NG";
            }

            if (ganbanAddDt.Rows.Count == 0)
            {
                frmMessage frm1 = new frmMessage("간판라벨 생성이 실패했습니다.(" + ganbanAddDt.Rows[0]["p_err_msg"].ToString() + ")", "AUTOCLOSE");
                frm1.ShowDialog();
                return "NG";
            }

            make_ganban_id = ganbanAddDt.Rows[0]["p_ganbanid"].ToString();

            ganban_print(make_ganban_id);

            return make_ganban_id;
        }

        private void ganban_print(string ganbanid)
        {
            clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", "", "", ganbanid, ref _BasicDs);
        }

        private void bntReprint_Click(object sender, EventArgs e)
        {
            frmMessage frm = new frmMessage("간판라벨을 재발행 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                ganban_print("txtSN.Text");
            }
        }

        private void btnPOSearch_Click(object sender, EventArgs e)
        {
            button_po_search();
        }

        private void button_po_search()
        {
            clsStatic._WORK_ORDER_ID = "";
            frmPOSearch frm = new frmPOSearch("R");
            frm.ShowDialog();

            if(clsStatic._WORK_ORDER_ID != "")
            {
                wo_search();
                wo_ganban_body_search();
            }
        }

        private void wo_search()
        {
            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap1.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap1.Add("RESOURCE_CD", clsStatic._RESOURCE_CD);
            paramsMap1.Add("WORK_ORDER_ID", clsStatic._WORK_ORDER_ID);


            paramsList1.Add(paramsMap1);

            string retvalue = "";

            _woDt.Dispose();
            _woDt = new DataTable();
            _woDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_popwo.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            if (_woDt == null)
            {
                init_process();
                return;
            }

            if (_woDt.Rows.Count == 0)
            {
                init_process();
                return;
            }

            btnPOSearch.Text = _woDt.Rows[0]["WORKORDERID"].ToString();

            lblItem.Text = _woDt.Rows[0]["ITEMID"].ToString();
            lblItemDesc.Text = _woDt.Rows[0]["ITEMNAME"].ToString();
            lblPlanQty.Text = _woDt.Rows[0]["CONFIRMQTY"].ToString();
            lblLabelID.Text = _woDt.Rows[0]["POPGANBANLABELID"].ToString();
            lblSPECIFICATION.Text = _woDt.Rows[0]["SPECIFICATION"].ToString(); 
        }

        private void frmMainProductInput_FormClosed(object sender, FormClosedEventArgs e)
        {
            serialButton1.Close();
        }
    }
}
