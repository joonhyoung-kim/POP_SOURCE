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
    public partial class frmGanban : Form
    {
        DataTable _ganban_DesignDt = new DataTable();
        DataSet _BasicDs = new DataSet();

        DataTable _ganHeadDt = new DataTable();
        DataTable _ganBodyDt = new DataTable();
        DataTable _itemDt = new DataTable();
        int _makeGanban = 0;
        int _allqty = 0;
        int _makeqty = 0;
        string _work_order_id = "";
        string _fromDesc = "";
        string _pa_ganban_id = "";
        string _pa_vendor_id = "";
        string _ganbanType = "";
        string _sn = "";
        string _stockid = "";
        string _grFlag = "";

        public frmGanban()
        {
            InitializeComponent();

            InitGanbanList();

            _BasicDs = clsLabelSet.basic_info_search(clsStatic._MACADDRESS);
        }

        public frmGanban(string startNumber)
        {
            InitializeComponent();

            InitGanbanList();

            _BasicDs = clsLabelSet.basic_info_search(clsStatic._MACADDRESS);

            btnInit.Enabled = false;
            _grFlag = "GR";

            txtSN.Text = startNumber;
            ganban_main_process();
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
            lblCT.Text = "";
            lblAllQty.Text = "";
            lblPallet.Text = "";
            lblDepartureGID.Text = "";
            txtSN.Text = "";
            _stockid = "";

            _itemDt.Rows.Clear();
            lblCtQty.Text = "";
            lblGanbanQty.Text = "";
            lblPossibleQty.Text = "";
            lblStock.Text = "";
            lblLabelID.Text = "";


            _ganHeadDt.Dispose();
            _ganHeadDt = new DataTable();
            _ganBodyDt.Dispose();
            _ganBodyDt = new DataTable();
            


            grdGanban.RemoveAll();

            txtSN_Focus();
        }

        private void txtSN_Leave(object sender, EventArgs e)
        {
            txtSN.BackColor = Color.Red;
        }

        private void txtSN_MouseClick(object sender, MouseEventArgs e)
        {
            txtSN.BackColor = Color.Yellow;
        }

        private void txtSN_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                ganban_main_process();
            }
        }

        private void ganban_main_process()
        {
            string ganbanType = ganbanCheck();

            if (ganbanType == "")
            {
                frmMessage frm1 = new frmMessage("존재하지 않는 라벨정보입니다. 다시한번 확인하여 주세요.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (ganbanType == "PALLET")
            {
                frmMessage frm1 = new frmMessage("파레트는 간판라벨을 구성할 수 없습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }
            _ganbanType = ganbanType;

            _sn = txtSN.Text;
            _fromDesc = "from " + _ganbanType;

            if (_ganbanType == "DEPATURE" || _ganbanType == "CT")
            {
                bntReprint.Enabled = false;
                _pa_ganban_id = "-";
                wo_ganban_head_search();
                wo_ganban_body_search();

                btnGanbandelete.Visible = false;
                btnAutoLabelPrint.Visible = true;
                _pa_vendor_id = "-";
            }
            else if (_ganbanType == "GANBAN")
            {
                bntReprint.Enabled = true;
                _pa_ganban_id = txtSN.Text.Trim();
                wo_ganban_head_search();
                wo_ganban_body_search();
                btnGanbandelete.Visible = true;
                btnAutoLabelPrint.Visible = false;
            }
            txtSN_Focus();
        }

        private void wo_ganban_body_search()
        {
            grdGanban.RemoveAll();

            string palletid = "";
            string ct = "";
            string ganban = "";
            string depature = "";

            if (_ganbanType == "PALLET")
            {
                palletid = txtSN.Text.Trim();
            }
            else if (_ganbanType == "CT")
            {
                ct = txtSN.Text.Trim();
            }
            else if (_ganbanType == "GANBAN")
            {
                ganban = txtSN.Text.Trim();
            }
            else if (_ganbanType == "DEPATURE")
            {
                depature = txtSN.Text.Trim();
            }

            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap1.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap1.Add("WORK_ORDER_ID", "");
            paramsMap1.Add("PALLETID", palletid);
            paramsMap1.Add("CT", ct);
            paramsMap1.Add("GANBAN_ID", ganban);
            paramsMap1.Add("DEPARTURE_GROUP_ID", depature);
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
                lblPossibleQty.Text = (int.Parse(lblAllQty.Text.Replace(",", "")) - int.Parse(lblGanbanQty.Text.Replace(",", "")) + _makeGanban).ToString("###,##0");
                return;
            }

            if (_ganBodyDt.Rows.Count == 0)
            {
                lblGanbanQty.Text = _makeqty.ToString("###,##0");
                lblPossibleQty.Text = (int.Parse(lblAllQty.Text.Replace(",", "")) - int.Parse(lblGanbanQty.Text.Replace(",", "")) + _makeGanban).ToString("###,##0");
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

            lblPossibleQty.Text = (int.Parse(lblAllQty.Text.Replace(",", "")) -int.Parse(lblGanbanQty.Text.Replace(",", ""))).ToString("###,##0");

        }

        private void wo_ganban_head_search()
        {
            string palletid = "";
            string ct = "";
            string ganban = "";
            string depature = "";

            if (_ganbanType == "PALLET")
            {
                palletid = txtSN.Text.Trim();
            }
            else if (_ganbanType == "CT")
            {
                ct = txtSN.Text.Trim();
            }
            else if (_ganbanType == "GANBAN")
            {
                ganban = txtSN.Text.Trim();
            }
            else if (_ganbanType == "DEPATURE")
            {
                depature = txtSN.Text.Trim();
            }

            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap1.Add("COMPANY_CD", clsStatic._COMPANY_CD);


            string retvalue = "";

            _ganHeadDt.Dispose();
            _ganHeadDt = new DataTable();

            if (_ganbanType == "PALLET" || _ganbanType == "CT")
            {
                _pa_vendor_id = "-";

                paramsMap1.Add("PALLETID", palletid);
                paramsMap1.Add("CT", ct);
                paramsList1.Add(paramsMap1);

                _ganHeadDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getGanbanHeadPackList.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);
            }
            else if (_ganbanType == "GANBAN")
            {
                paramsMap1.Add("GANBAN_ID", ganban);
                paramsList1.Add(paramsMap1);

                _ganHeadDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getGanbanHeadGanbanList.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);
            }
            else if (_ganbanType == "DEPATURE")
            {
                paramsMap1.Add("MATERIAL_DEPARTURE_ID", depature);
                paramsList1.Add(paramsMap1);

                _ganHeadDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getGanbanHeadDepatureList.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);
            }
            


            if (_ganHeadDt == null)
            {
                return;
            }

            if (_ganHeadDt.Rows.Count == 0)
            {
                return;
            }

            lblDepartureGID.Text = _ganHeadDt.Rows[0]["DEPARTUREGROUPID"].ToString();
            lblVendorNm.Text     = _ganHeadDt.Rows[0]["VENDORNAME"].ToString();
            lblLabelID.Text      = _ganHeadDt.Rows[0]["POPGANBANLABELID"].ToString();
            if (_grFlag == "GR")
            {
                _stockid      = clsStatic._TOLINE;
                lblStock.Text = clsStatic._TOLINE_DESC + "(" + clsStatic._TOLINE + ")";
            }
            else
            {
                _stockid      = _ganHeadDt.Rows[0]["SLOC"].ToString();
                lblStock.Text = _ganHeadDt.Rows[0]["SLOCNAME"].ToString() + "(" + _ganHeadDt.Rows[0]["SLOC"].ToString() + ")";
            }
            if (_ganbanType == "PALLET")
            {
                lblPallet.Text   = _ganHeadDt.Rows[0]["PALLETID"].ToString();
                lblCT.Text       = "-";
            }
            else if (_ganbanType == "CT")
            {
                lblPallet.Text   = "-";
                lblCT.Text       = _ganHeadDt.Rows[0]["CT"].ToString();
            }
            else if (_ganbanType == "GANBAN" || _ganbanType == "DEPATURE")
            {
                lblPallet.Text   = "-";
                lblCT.Text       = "-";
            }
            lblCtQty.Text        = _ganHeadDt.Rows[0]["POPCTQTY"].ToString();
            _work_order_id       = _ganHeadDt.Rows[0]["WORKORDERID"].ToString();


            item_combo_bind();
        }

        private void item_combo_bind()
        {
            _itemDt.Dispose();

            _itemDt = new DataTable();
            _itemDt.Columns.Add("itemID");
            _itemDt.Columns.Add("itemName");

            _allqty = 0;
            string buf = "";
            for(int i=0;i<_ganHeadDt.Rows.Count;i++)
            {
                if(i==0)
                {
                    buf = _ganHeadDt.Rows[i]["ITEMID"].ToString();
                    _itemDt.Rows.Add(_ganHeadDt.Rows[i]["ITEMID"].ToString(), _ganHeadDt.Rows[i]["ITEMNAME"].ToString());
                }
                else
                {
                    if(buf != _ganHeadDt.Rows[i]["ITEMID"].ToString())
                    {
                        buf = _ganHeadDt.Rows[i]["ITEMID"].ToString();
                        _itemDt.Rows.Add(_ganHeadDt.Rows[i]["ITEMID"].ToString(), _ganHeadDt.Rows[i]["ITEMNAME"].ToString());
                    }
                }
                _allqty += int.Parse(_ganHeadDt.Rows[i]["GOODQTY"].ToString().Trim());
            }

            comboItem.DisplayMember = "itemName";
            comboItem.ValueMember = "itemID";
            comboItem.DataSource = _itemDt;

            comboItem.SelectedIndex = 0;

            lblAllQty.Text = _allqty.ToString("###,##0");
        }

        private string ganbanCheck()
        {
            if (txtSN.Text.Trim() == "")
            {
                return "NODATA";
            }

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_sloc", "");
            paramsMap.Add("p_ganbantype", "");
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD",  clsStatic._COMPANY_CD);
            paramsMap.Add("P_SN",          txtSN.Text.Trim());
            paramsList.Add(paramsMap);
            string retvalue = "";
            DataTable snDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_ganbancheck_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (snDt == null)
            {
                frmMessage frm1 = new frmMessage("입력한 SN의 타입이 정상적으로 리턴되지 않았습니다!", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return "NODATA";
            }

            if (snDt.Rows.Count == 0)
            {
                frmMessage frm2 = new frmMessage("입력한 SN의 타입이 정상적으로 리턴되지 않았습니다!", "AUTOCLOSE");
                frm2.ShowDialog();
                txtSN_Focus();
                return "NODATA";
            }

            string ganbanType = snDt.Rows[0]["p_ganbantype"].ToString();

            return ganbanType;
        }

        private void txtSN_Focus()
        {
            txtSN.BackColor = Color.Yellow;
            txtSN.Focus();
            txtSN.SelectAll();
        }

        private void btnSet_Click(object sender, EventArgs e)
        {
            txtSN_Focus();
        }

        private void btnInit_Click(object sender, EventArgs e)
        {
            frmMessage frm = new frmMessage("화면을 초기화 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                init_process();
            }

            txtSN_Focus();
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

        private void btnLabelPrint_Click(object sender, EventArgs e)
        {
            insertGanban();
        }

        private void insertGanban()
        {
            if(lblPossibleQty.Text.Trim() == "")
            {
                return;
            }

            if (_makeGanban <= 0)
            {
                frmMessage frm1 = new frmMessage("간판라벨 수량을 입력하여 주세요!", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (_makeGanban > int.Parse(lblPossibleQty.Text.Replace(",", "")))
            {
                frmMessage frm1 = new frmMessage("간판라벨 수량이 총수량보다 많습니다!", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }
            if (_ganbanType == "PALLET" || _ganbanType == "CT" || _ganbanType == "DEPATURE") 
            {
                make_ganban(_makeGanban.ToString());

                int remainder = int.Parse(lblPossibleQty.Text.Replace(",", "")) - _makeGanban;

                if(remainder > 0)
                {
                    frmMessage frm = new frmMessage("간판라벨 구성 후 잔여 수량이 남았습니다(" + remainder.ToString() + "EA). 나머지 수량도 간판라벨을 구성하겠습니까?", "OK_CANCEL");
                    DialogResult result = frm.ShowDialog();

                    if (result == DialogResult.OK)
                    {
                        make_ganban(remainder.ToString());
                    }
                }

                

            }
            else if (_ganbanType == "GANBAN")
            {
                int remainder = int.Parse(lblAllQty.Text.Replace(",", "")) - _makeGanban;
                make_ganban(_makeGanban.ToString());
                if(remainder > 0)
                {
                    make_ganban(remainder.ToString());
                }
            }

            wo_ganban_head_search();
            wo_ganban_body_search();
            _makeGanban = 0;
            btnGanbanSet.Text = "간반구성 : 0";
            btnGanbanSet.BackColor = Color.Gray;

            txtSN_Focus();


        }

        private void make_ganban(string makeGanban)
        {
            string pallet = "";
            string ct = "";
            string ganban = "";
            string depature = "";

            if(_ganbanType == "PALLET")
            {
                pallet = _sn;
                ct = "-";
                ganban = "-";
                depature = lblDepartureGID.Text;
            }
            else if (_ganbanType == "CT")
            {
                pallet = "-";
                ct = _sn;
                ganban = "-";
                depature = lblDepartureGID.Text;
            }
            else if (_ganbanType == "GANBAN")
            {
                pallet = "-";
                ct = "-";
                ganban = _sn;
                depature = lblDepartureGID.Text;
            }
            else if (_ganbanType == "DEPATURE")
            {
                pallet = "-";
                ct = "-";
                ganban = "-";
                depature = _sn;
            }

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_runCount", "");
            paramsMap.Add("p_ganbanid", "");
            paramsMap.Add("P_DIVISION_CD",        clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD",         clsStatic._COMPANY_CD);
            paramsMap.Add("P_ITEM_ID",            comboItem.SelectedValue.ToString());
            paramsMap.Add("P_DEPARTURE_GROUP_ID", depature);
            paramsMap.Add("P_WORK_ORDER_ID",      _work_order_id);
            paramsMap.Add("P_PALLETID",           pallet);
            paramsMap.Add("P_CT",                 ct);
            paramsMap.Add("P_GOOD_QTY",           makeGanban);
            paramsMap.Add("P_FROM_SLOC",          "-");
            paramsMap.Add("P_SLOC",               _stockid);
            paramsMap.Add("P_VENDOR_CD",          _pa_vendor_id);
            paramsMap.Add("P_DESCRIPTION",        _fromDesc);
            paramsMap.Add("P_PA_GANBAN_ID",       ganban);
            paramsMap.Add("P_CREATE_BY",          clsStatic._USER_ID);

            paramsList.Add(paramsMap);
            string retvalue = "";
            DataTable ganbanAddDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_ganbaninsert_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if(ganbanAddDt == null)
            {
                frmMessage frm1 = new frmMessage("간판라벨 생성이 실패했습니다.(" + ganbanAddDt.Rows[0]["p_err_msg"].ToString() + ")", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            if (ganbanAddDt.Rows.Count == 0)
            {
                frmMessage frm1 = new frmMessage("간판라벨 생성이 실패했습니다.(" + ganbanAddDt.Rows[0]["p_err_msg"].ToString() + ")", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            ganban_print(ganbanAddDt.Rows[0]["p_ganbanid"].ToString());
        }

        private void ganban_print(string ganbanid)
        {
            clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", "", "", ganbanid, ref _BasicDs);
        }

        private void btnAutoLabelPrint_Click(object sender, EventArgs e)
        {
            if(lblPossibleQty.Text.Trim() == "")
            {
                return;
            }
            if (int.Parse(lblPossibleQty.Text.Replace(",", "")) <= 0)
            {
                frmMessage frm1 = new frmMessage("간판 생성 수량이 0입니다.(생성불가)", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            frmMessage frm = new frmMessage("자동 간판라벨발행을 실행 하시겠습니까?(박스구성수량 기준)", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                int pollibleQty = int.Parse(lblPossibleQty.Text.Replace(",", ""));
                int makeqty = pollibleQty / int.Parse(lblCtQty.Text.Replace(",", ""));
                int etc = pollibleQty % int.Parse(lblCtQty.Text.Replace(",", ""));

                for(int i=0;i<makeqty;i++)
                {
                    make_ganban(lblCtQty.Text.Replace(",", ""));
                    Thread.Sleep(500);
                }

                if(etc > 0)
                {
                    make_ganban(etc.ToString());
                }

                wo_ganban_body_search();
                txtSN_Focus();
            }
        }

        private void lblCtQty_Click(object sender, EventArgs e)
        {
            clsStatic._dialogValue = "";

            frmLoginIDInsert frm = new frmLoginIDInsert(lblCtQty.Text);
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                lblCtQty.Text = int.Parse(clsStatic._dialogValue).ToString("###,##0");
                clsStatic._dialogValue = "";
            }
        }

        private void btnGanbandelete_Click(object sender, EventArgs e)
        {
            if(txtSN.Text.Trim().Length != 8)
            {
                txtSN_Focus();
                return;
            }

            if (txtSN.Text.Trim().Substring(0, 1) != "K")
            {
                txtSN_Focus();
                return;
            }

            DataRow[] drs = _ganBodyDt.Select("ganbanid = '" + txtSN.Text.Trim() + "'");
            if(drs.Length != 1)
            {
                txtSN_Focus();
                return;
            }

            string useyn = drs[0]["USEYN"].ToString();
            if(useyn == "N")
            {
                frmMessage frm1 = new frmMessage("이미 삭제처리된 간판라벨입니다.", "AUTOCLOSE");
                DialogResult result1 = frm1.ShowDialog();
                txtSN_Focus();
                return;
            }


            frmMessage frm = new frmMessage("입력한 간판라벨을 삭제 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
                Dictionary<string, object> paramsMap = new Dictionary<string, object>();
                paramsMap.Add("p_err_code", "");
                paramsMap.Add("p_err_msg", "");
                paramsMap.Add("p_runCount", "");
                paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
                paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
                paramsMap.Add("P_GANBAN_ID", txtSN.Text.Trim());
                paramsMap.Add("P_CREATE_BY", clsStatic._USER_ID);

                paramsList.Add(paramsMap);
                string retvalue = "";
                DataTable ganbanAddDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_deleteGanban_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

                _pa_ganban_id = txtSN.Text.Trim();
                wo_ganban_head_search();
                wo_ganban_body_search();
                btnGanbandelete.Visible = true;
                btnAutoLabelPrint.Visible = false;
                txtSN_Focus();
            }

        }

        private void bntReprint_Click(object sender, EventArgs e)
        {
            frmMessage frm = new frmMessage("간판라벨을 재발행 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                ganban_print(txtSN.Text);
            }

            txtSN_Focus();
        }
    }
}
