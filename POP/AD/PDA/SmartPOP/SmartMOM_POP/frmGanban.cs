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
        double _makeGanban = 0;
        double _allqty = 0;
        double _makeqty = 0;
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
            btnSet_Click(null, null);
        }

        public frmGanban(string startNumber)
        {
            InitializeComponent();

            InitGanbanList();

            _BasicDs = clsLabelSet.basic_info_search(clsStatic._MACADDRESS);

            //btnInit.Enabled = false;
            _grFlag = "GR";

            txtSN.Text = startNumber;
            ganban_main_process();
            btnSet_Click(null, null);
        }

        private void InitGanbanList()
        {
            //                                   0               1               2                   3              4                 5                6                7                8               9           10           11             
            string[] headerText = new string[] { "사용여부",     "간판라벨번호", "출발번호",         "W/O",         "FROM창고",       "현재창고",      "이동일자",      "이동담당자",    "구성수량", "생성자",   "생성일자"    }; //12
            string[] columnName = new string[] { "USEYN",        "GANBANID",     "DEPARTUREGROUPID", "WORKORDERID", "FROMLOCATIONCD", "LOCATIONCD",    "MOVEDATE",      "MOVEBY",        "QTY",      "NAME",     "CREATEDATE"  };
            string[] columnType = new string[] { "T",            "T",            "T",                "T",           "T",              "T",             "T",             "T",             "T",        "T",        "T"};
                                                                                                                                                                                                                                               
            int[] columnWidth    = new int[]   { 150,            150,            250,                200,           250,              250,             250,             250,             150,        200,        250          };
            bool[] columnVisible = new bool[]  { true,           true,           true,               true,          true,             true,            true,            true,            true,       true,       true         };
            bool[] columnDisable = new bool[]  { true,           true,           true,               true,          true,             true,            true,            true,            true,       true,       true         };
            string[] cellAlign = new string[]  { "C",            "C",            "C",                "C",           "C",              "C",             "C",             "C",             "C",        "C",        "C"          };
                                                             
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

            bntReprint.Enabled = true;
            _pa_ganban_id = "-";
            wo_ganban_head_search();
            wo_ganban_body_search();

            btnGanbandelete.Visible = false;
            btnAutoLabelPrint.Visible = true;
            _pa_vendor_id = "-";

            if (ganbanType == "NODATA")
            {
                frmMessage2 frm1 = new frmMessage2("존재하지 않는 라벨정보입니다. 다시한번 확인하여 주세요.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            _ganbanType = ganbanType;

            _sn = txtSN.Text;
            _fromDesc = "from " + _ganbanType;

            
            if (_ganbanType == "DP")
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

            string ganban = "";
            string depature = "";

            if (_ganbanType == "DP")
            {
                ganban = txtSN.Text.Trim();
            } else
            {
                depature = txtSN.Text.Trim();
            }

            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap1.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap1.Add("WORK_ORDER_ID", "");
            paramsMap1.Add("GANBAN_ID", ganban);
            paramsMap1.Add("DEPARTURE_GROUP_ID", depature);
            paramsMap1.Add("dateFlag", "");
            paramsMap1.Add("USE_YN", "Y");

            paramsList1.Add(paramsMap1);

            string retvalue = "";

            _ganBodyDt.Dispose();
            _ganBodyDt = new DataTable();
            _ganBodyDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getGanbanBodyList.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            _makeqty = 0;
            if (_ganBodyDt == null)
            {
                lblGanbanQty.Text = _makeqty.ToString("###,##0.##");
                lblPossibleQty.Text = (double.Parse((double.Parse(lblAllQty.Text.Replace(",", "")) - double.Parse(lblGanbanQty.Text.Replace(",", ""))).ToString("###,##0.##")) + _makeGanban).ToString("###,##0.##");
                return;
            }

            if (_ganBodyDt.Rows.Count == 0)
            {

                if (_makeqty.ToString("###,##0.##") != "")
                {
                    lblGanbanQty.Text = _makeqty.ToString("###,##0.##");
                    lblPossibleQty.Text = (double.Parse((double.Parse(lblAllQty.Text.Replace(",", "")) - double.Parse(lblGanbanQty.Text.Replace(",", ""))).ToString("###,##0.##")) + _makeGanban).ToString("###,##0.##");
                }
                else
                {
                    lblGanbanQty.Text = "0";
                    lblPossibleQty.Text = (double.Parse(lblAllQty.Text.Replace(",", "")) + _makeGanban).ToString("###,##0.##");
                }
                return;
            }
            
            grdGanban.DataBindDataSource(_ganBodyDt, false, false);
            _makeqty = 0;
            for (int i =0;i<_ganBodyDt.Rows.Count;i++)
            {
                if (_ganBodyDt.Rows[i]["USEYN"].ToString().Trim() == "Y")
                {
                    _makeqty += double.Parse(_ganBodyDt.Rows[i]["QTY"].ToString().Trim());
                }
            }
            lblGanbanQty.Text = _makeqty.ToString("###,##0.##");

            lblPossibleQty.Text = (double.Parse(lblAllQty.Text.Replace(",", "")) - double.Parse(lblGanbanQty.Text.Replace(",", ""))).ToString("###,##0.##");

        }

        private void wo_ganban_head_search()
        {
            string palletid = "";
            string ct = "";
            string ganban = "";
            string depature = "";

            if (_ganbanType == "DP")
            {
                ganban = txtSN.Text.Trim();
            }
            else 
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

            if (_ganbanType == "DP")
            {
                paramsMap1.Add("GANBAN_ID", ganban);
                paramsList1.Add(paramsMap1);

                _ganHeadDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getGanbanHeadGanbanList.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);
            }
            else 
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

            if (_ganbanType == "DP")
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
                _allqty += double.Parse(_ganHeadDt.Rows[i]["GOODQTY"].ToString().Replace(",",""));
            }

            comboItem.DisplayMember = "itemName";
            comboItem.ValueMember = "itemID";
            comboItem.DataSource = _itemDt;

            comboItem.SelectedIndex = 0;

            lblAllQty.Text = _allqty.ToString("###,##0.##");
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
                frmMessage2 frm1 = new frmMessage2("입력한 SN의 타입이 정상적으로 리턴되지 않았습니다!", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return "NODATA";
            }

            if (snDt.Rows.Count == 0)
            {
                frmMessage2 frm2 = new frmMessage2("입력한 SN의 타입이 정상적으로 리턴되지 않았습니다!", "AUTOCLOSE");
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
            frmMessage2 frm = new frmMessage2("화면을 초기화 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                init_process();
            }

            txtSN_Focus();
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            frmMessage2 frm = new frmMessage2("간판라벨발행 화면을 종료 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                this.Close();
            }
        }

        private void btnGanbanSet_Click(object sender, EventArgs e)
        {
            clsStatic._dialogValue = "";

            frmLoginIDInsert2 frm = new frmLoginIDInsert2(_makeGanban.ToString());
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                _makeGanban = double.Parse(clsStatic._dialogValue);

                btnGanbanSet.Text = "간판구성 : " + _makeGanban.ToString("###,##0.##");
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
            if (lblLabelID.Text.ToString() == "NONE")
            {
                frmMessage2 frm1 = new frmMessage2("이미 라벨이 발행되었거나, 간판라벨 설정이 되지 않았습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (_makeGanban <= 0)
            {
                frmMessage2 frm1 = new frmMessage2("간판라벨 수량을 입력하여 주세요!", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (_makeGanban > double.Parse(lblPossibleQty.Text.Replace(",", "")))
            {
                frmMessage2 frm1 = new frmMessage2("간판라벨 수량이 총수량보다 많습니다!", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            string retbuf = "";
            retbuf = get_ganbanSeq();

            if (retbuf == "NG")
            {
                frmMessage2 frm1 = new frmMessage2("현재 라벨발행 진행중입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            try
            {
                if (_ganbanType == "DP")
                {
                    string remainder = (double.Parse(lblAllQty.Text.Replace(",", "")) - _makeGanban).ToString();
                    make_ganban(retbuf, _makeGanban.ToString(), comboItem.SelectedValue.ToString(), lblDepartureGID.Text.ToString());
                    if (double.Parse(remainder) > 0)
                    {
                        make_ganban(retbuf, remainder.ToString(), comboItem.SelectedValue.ToString(), lblDepartureGID.Text.ToString());
                    }
                }
                else
                {
                    make_ganban(retbuf, _makeGanban.ToString(), comboItem.SelectedValue.ToString(), lblDepartureGID.Text.ToString());

                    double remainder = double.Parse(lblPossibleQty.Text.Replace(",", "")) - _makeGanban;

                    if (remainder > 0)
                    {
                        frmMessage2 frm = new frmMessage2("간판라벨 구성 후 잔여 수량이 남았습니다(" + remainder.ToString() + "EA). 나머지 수량도 간판라벨을 구성하겠습니까?", "OK_CANCEL");
                        DialogResult result = frm.ShowDialog();

                        if (result == DialogResult.OK)
                        {
                            make_ganban(retbuf, remainder.ToString(), comboItem.SelectedValue.ToString(), lblDepartureGID.Text.ToString());
                        }
                    }
                }

                ganban_print(retbuf);
            } catch(Exception ex)
            {
                delete_temp(retbuf, "GANBAN");
                frmMessage2 frm1 = new frmMessage2("라벨 발행에 실패 했습니다. 잠시 후 다시 시도 하세요.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
            }

            wo_ganban_head_search();
            wo_ganban_body_search();
            _makeGanban = 0;
            btnGanbanSet.Text = "간반구성 : 0";
            btnGanbanSet.BackColor = Color.Gray;

            txtSN_Focus();


        }

        private void delete_temp(string moveId, string tmpType)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_TMP_TYPE", tmpType);
            paramsMap.Add("P_TMP_ID", moveId);
            paramsList.Add(paramsMap);
            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.del_TmpData_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);
        }

        private void make_ganban(string labelid, string makeGanban, string itemId, string materialdepartureId)
        {
            string ganban = "";
            string depature = "";

            ganban = "-";
            depature = materialdepartureId;

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_runCount", "");
            paramsMap.Add("p_ganbanid", "");
            paramsMap.Add("P_LABEL_ID", labelid);
            paramsMap.Add("P_IP_ADDRESS", clsStatic._GANBANPRINT);
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_ITEM_ID", itemId);
            paramsMap.Add("P_DEPARTURE_GROUP_ID", depature);
            paramsMap.Add("P_WORK_ORDER_ID", "");
            paramsMap.Add("P_GANBANTYPE", "DP");
            paramsMap.Add("P_GOOD_QTY", makeGanban);
            paramsMap.Add("P_FROM_SLOC", "");
            paramsMap.Add("P_SLOC", clsStatic._TOLINE);
            paramsMap.Add("P_VENDOR_CD", "-");
            paramsMap.Add("P_DESCRIPTION", "from DEPATURE");
            paramsMap.Add("P_PA_GANBAN_ID", ganban);
            paramsMap.Add("P_CREATE_BY", clsStatic._USER_ID);

            paramsList.Add(paramsMap);
            string retvalue = "";
            DataTable ganbanAddDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_ganbaninsert_proc_new1.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (ganbanAddDt == null)
            {
                frmMessage2 frm1 = new frmMessage2("간판라벨 생성이 실패했습니다.(" + ganbanAddDt.Rows[0]["p_err_msg"].ToString() + ")", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            if (ganbanAddDt.Rows.Count == 0)
            {
                frmMessage2 frm1 = new frmMessage2("간판라벨 생성이 실패했습니다.(" + ganbanAddDt.Rows[0]["p_err_msg"].ToString() + ")", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            if (ganbanAddDt.Rows[0]["p_err_code"].ToString().Equals("ERROR"))
            {
                throw new Exception();
            }
        }

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
                frmMessage2 frm1 = new frmMessage2("출력할 간판라벨이 없습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            if (checkDt.Rows.Count <= 0)
            {
                frmMessage2 frm1 = new frmMessage2("출력할 간판라벨이 없습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            for(int i = 0; i< checkDt.Rows.Count; i++)
            {
                clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", "", checkDt.Rows[i]["GANBANID"].ToString(), "", ref _BasicDs);
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

        private void btnAutoLabelPrint_Click(object sender, EventArgs e)
        {
            if (lblLabelID.Text.ToString() == "NONE")
            {
                frmMessage2 frm1 = new frmMessage2("이미 라벨이 발행되었거나, 간판라벨 설정이 되지 않았습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            
            if (double.Parse(lblPossibleQty.Text.Replace(",", "")) <= 0)
            {
                frmMessage2 frm1 = new frmMessage2("간판 생성 가능 수량이 0입니다.(생성불가)", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            if(lblCtQty.Text.Replace(",", "") == "")
            {
                frmMessage2 frm1 = new frmMessage2("박스 구성 수량이 0입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            string retbuf = "";
            retbuf = get_ganbanSeq();

            if (retbuf == "NG")
            {
                frmMessage2 frm1 = new frmMessage2("현재 라벨발행 진행중입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            frmMessage2 frm = new frmMessage2("자동 간판라벨발행을 실행 하시겠습니까?(박스구성수량 기준)", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            try
            {
                if (result == DialogResult.OK)
                {
                    double pollibleQty = double.Parse(lblPossibleQty.Text.Replace(",", ""));
                    int makeqty = Convert.ToInt32(System.Math.Truncate(pollibleQty / double.Parse(lblCtQty.Text.Replace(",", ""))));
                    string etc = (pollibleQty % double.Parse(lblCtQty.Text.Replace(",", ""))).ToString("####0.##");

                    for (int i = 0; i < makeqty; i++)
                    {
                        make_ganban(retbuf, lblCtQty.Text.Replace(",", ""), comboItem.SelectedValue.ToString(), lblDepartureGID.Text.ToString());
                        Thread.Sleep(500);
                    }

                    if (double.Parse(etc) > 0)
                    {
                        make_ganban(retbuf, etc, comboItem.SelectedValue.ToString(), lblDepartureGID.Text.ToString());
                    }

                    ganban_print(retbuf);

                    wo_ganban_body_search();
                    txtSN_Focus();
                }
            } catch(Exception ex)
            {
                delete_temp(retbuf, "GANBAN");
                frmMessage2 frm1 = new frmMessage2("라벨 발행에 실패 했습니다. 잠시 후 다시 시도 하세요.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
            }
        }

        private void lblCtQty_Click(object sender, EventArgs e)
        {
            clsStatic._dialogValue = "";

            frmLoginIDInsert2 frm = new frmLoginIDInsert2(lblCtQty.Text);
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                lblCtQty.Text = double.Parse(clsStatic._dialogValue).ToString("###,##0.##");
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
                frmMessage2 frm1 = new frmMessage2("이미 삭제처리된 간판라벨입니다.", "AUTOCLOSE");
                DialogResult result1 = frm1.ShowDialog();
                txtSN_Focus();
                return;
            }


            frmMessage2 frm = new frmMessage2("입력한 간판라벨을 삭제 하시겠습니까?", "OK_CANCEL");
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
            frmMessage2 frm = new frmMessage2("간판라벨을 재발행 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (grdGanban.Rows.Count <= 0)
            {
                frmMessage2 frm1 = new frmMessage2("선택된라벨 정보가 없습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            string retbuf = "";
            retbuf = get_ganbanSeq();

            if (retbuf == "NG")
            {
                frmMessage2 frm1 = new frmMessage2("현재 라벨발행 진행중입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (result == DialogResult.OK)
            {
                int selectedRow = grdGanban.CurrentRow.Index;

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
                paramsMap.Add("P_GANBAN_ID", grdGanban["간판라벨번호", selectedRow].Value.ToString());

                paramsList.Add(paramsMap);
                string retvalue = "";
                DataTable ganbanAddDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_ganbantmpinsert_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);


                ganban_print(retbuf);
            }

            txtSN_Focus();
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
            paramsCheckMap.Add("IP_ADDRESS", clsStatic._GANBANPRINT);

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

        private void frmGanban_Load(object sender, EventArgs e)
        {

        }
    }
}
