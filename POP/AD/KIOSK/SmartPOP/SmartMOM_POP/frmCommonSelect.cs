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
using MetroFramework.Forms;

namespace SmartMOM_POP
{
    public partial class frmCommonSelect : Form
    {
        string _selectType = "";
        DataTable _buttonDt = new DataTable();
        int _startbuttonno = 0;

        public frmCommonSelect(string selectType)
        {
            InitializeComponent();

            btnBody07.Visible = false;

            _selectType = selectType;

            btnLabelDesign.Enabled = true;

            if (clsStatic._LABELYN == "Y")
            {
                btnLabelDesign.Enabled = true;
            }
            if (clsStatic._resouceType == "LINE")
            {
                if (clsStatic._USEMANAGEMENT == "STOCK")
                {
                    btnPrev.Visible = false;
                    btnNext.Visible = false;

                    //btnBody01.Text = "출발처리";
                    btnBody01.Text = "자재입고";
                    btnBody02.Text = "원자재불출";
                    btnBody03.Text = "간판라벨분할";
                    btnBody04.Text = "간판라벨수동생성";
                    btnBody05.Text = "재고이동/공정이동";

                    btnBody06.Visible = false;
                    btnBody07.Visible = false;

                    lblTitle.Text = "공정이동/출하관리";
                }
                else if (clsStatic._USEMANAGEMENT == "PRODUCT_COMPLETE" || clsStatic._USEMANAGEMENT == "PRODUCT_INPUT")
                {
                    production_process();
                }
            }
            else if (clsStatic._resouceType == "USER")
            {
                user_process();
            }
            else if (clsStatic._STOCK_TYPE != "" && clsStatic._resouceType == "FROM")
            {
                stock_process("AREA");
            }
            else if (clsStatic._STOCK_TYPE != "" && clsStatic._resouceType == "TO")
            {
                stock_process("AREA");
            }
            else if (clsStatic._resouceType == "FROM" || clsStatic._resouceType == "TO")
            {
                stock_process("SO");
            }
            else if (clsStatic._resouceType == "ITEMTYPE")
            {
                itemtype_process();
            }
            else if (clsStatic._resouceType == "DESTINATION")
            {
                destination_process();
            }
            //else if (clsStatic._resouceType == "FROM" || clsStatic._resouceType == "TO")
            //{
            //    stock_process("SO");
            //}
            //else if (clsStatic._resouceType == "GANBAN")
            //{
            //    stock_process("");
            //}

        }

        private void user_process()
        {
            _buttonDt = clsStatic.getUserListInfo();
            button_init();
        }

        private void stock_process(string stockType)
        {
            _buttonDt = clsStatic.getStockListInfo("AREA");
            button_init();
        }

        private void itemtype_process()
        {
            _buttonDt = clsStatic.getComCodeListInfo("ITEM_TYPE", "Y", "", "");

            DataRow workRow = _buttonDt.NewRow();
            workRow["code"] = "ALL";
            workRow["name"] = "전체";
            workRow["value"] = "";
            workRow["codeName"] = "ALL(전체)";
            workRow["buttontext"] = "전체(ALL)";

            _buttonDt.Rows.InsertAt(workRow, 0);
            button_init();
        }

        private void destination_process()
        {
            _buttonDt = clsStatic.getDestination();

            DataRow workRow = _buttonDt.NewRow();
            button_init();
        }

        private void production_process()
        {
            _buttonDt = clsStatic.getBORInfo();
            button_init();
        }

        private void button_init()
        {
            var _prodButton = new[] { this.btnBody01, this.btnBody02, this.btnBody03, this.btnBody04, this.btnBody05, this.btnBody06 };
            int buttoncnt = _startbuttonno;

            for (int i = 0; i < 6; i++)
            {
                if (buttoncnt >= _buttonDt.Rows.Count)
                {
                    _prodButton[i].Text = "";
                    _prodButton[i].BackColor = Color.WhiteSmoke;
                    _prodButton[i].Visible = false;
                }
                else
                {
                    _prodButton[i].Text = _buttonDt.Rows[buttoncnt]["NAME"].ToString();
                    _prodButton[i].BackColor = Color.WhiteSmoke;
                    _prodButton[i].Visible = true;
                }
                buttoncnt++;
            }

        }

        private void btnPrintConfig_Click(object sender, EventArgs e)
        {
            frmPrintConfig frm = new frmPrintConfig();
            frm.ShowDialog();

            DataTable dt = clsLabelSet.getBCRPort(clsStatic._MACADDRESS);
            DataTable badFlagdt = clsLabelSet.getBadFlag(clsStatic._DIVISION_CD, clsStatic._COMPANY_CD);
            if (badFlagdt.Rows.Count > 0)
            {
                clsStatic._BADQTYFLAG = badFlagdt.Rows[0]["BADQTYFLAG"].ToString().Trim();
            }

            if (dt.Rows.Count > 0)
            {
                lblTitle.Text = "SmartPOP 로그인(" + dt.Rows[0]["USEMANAGEMENT"].ToString() + ")";
                clsStatic._USEMANAGEMENT = dt.Rows[0]["USEMANAGEMENT"].ToString();
                clsStatic._LABELYN = dt.Rows[0]["LABELYN"].ToString();
                clsStatic._PUSHBUTTON1 = dt.Rows[0]["PUSHBUTTON1"].ToString();
                clsStatic._PUSHBUTTON2 = dt.Rows[0]["PUSHBUTTON2"].ToString();
                clsStatic._PRINTID = dt.Rows[0]["PRINTID"].ToString();
                clsStatic._dpiPixcel = int.Parse(dt.Rows[0]["PRINTDPIMM"].ToString());
                clsStatic._GTPRINT = dt.Rows[0]["GTPRINT"].ToString();
                clsStatic._CTPRINT = dt.Rows[0]["CTPRINT"].ToString();
                clsStatic._PALLETPRINT = dt.Rows[0]["PALLETPRINT"].ToString();
                clsStatic._GANBANPRINT = dt.Rows[0]["GANBANPRINT"].ToString();
            }

            if (clsStatic._USEMANAGEMENT.Equals("PRODUCT_COMPLETE"))
            {
                clsStatic._STOCK_TYPE = "";
            }
        }

        private void btnLabelDesign_Click(object sender, EventArgs e)
        {
            frmLabelDesign frm = new frmLabelDesign();
            frm.ShowDialog();
        }

        private void btnPrintTest_Click(object sender, EventArgs e)
        {
        }



        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void btnMainIProductLine_Click(object sender, EventArgs e)
        {
            this.Visible = false;
            if (clsStatic._COMPANY_CD == "ADINT")
            {
                frmMainProductCompleteAD frm = new frmMainProductCompleteAD();
                frm.ShowDialog();
            }
            else if (clsStatic._COMPANY_CD == "ADINT")
            {
                frmMainProductCompleteEBESCO frm = new frmMainProductCompleteEBESCO();
                frm.ShowDialog();
            }
            this.Visible = true;
        }

        private void btnNext_Click(object sender, EventArgs e)
        {
            if (btnNext.BackColor == btnBody07.BackColor)
            {
                btnBody_Click(sender, e);
                return;
            }

            _startbuttonno += 6;

            if (_startbuttonno > _buttonDt.Rows.Count)
            {
                _startbuttonno = 0;
            }

            button_init();
        }

        private void btnPrev_Click(object sender, EventArgs e)
        {
            if(btnPrev.BackColor == btnBody07.BackColor)
            {
                btnBody_Click(sender, e);
                return;
            }


            _startbuttonno -= 6;

            if (_startbuttonno < 0)
            {
                int position = _buttonDt.Rows.Count / 6;
                _startbuttonno = 6 * position;
            }

            button_init();
        }

        private void btnBody_Click(object sender, EventArgs e)
        {
            string buf = ((Button)sender).Text;

            if (clsStatic._resouceType == "TO" || clsStatic._resouceType == "PRODUCT_INPUT")
            {
                string[] strs = buf.Split('(');

                clsStatic._TOLINE = strs[0];
                clsStatic._TOLINE_DESC = strs[strs.Length - 1].Substring(0, strs[strs.Length - 1].Length - 1);
                
            }
            else if (clsStatic._resouceType == "LINE")
            {
                if (clsStatic._USEMANAGEMENT == "PRODUCT_COMPLETE" || clsStatic._USEMANAGEMENT == "PRODUCT_INPUT")
                {
                    string[] strs = buf.Split('(');

                    clsStatic._RESOURCE_CD = strs[strs.Length - 1].Substring(0, strs[strs.Length - 1].Length - 1);
                    clsStatic._RESOURCE_TEXT = strs[0];
                }
                else
                {
                    clsStatic._RESOURCE_CD = buf;
                }
            }
            else if (clsStatic._resouceType == "USER")
            {
                string[] strs = buf.Split('(');

                clsStatic._USER_ID = strs[strs.Length - 1].Substring(0, strs[strs.Length - 1].Length - 1);
                clsStatic._USER_NAME = strs[0];
            }
            else if (clsStatic._resouceType == "DESTINATION")
            {
            }
            else if (clsStatic._USEMANAGEMENT == "PRODUCT_COMPLETE")
            {
                string[] strs = buf.Split('(');

                clsStatic._USER_ID = strs[strs.Length - 1].Substring(0, strs[strs.Length - 1].Length - 1);
                clsStatic._USER_NAME = strs[0];

                DataRow[] drs = _buttonDt.Select("BUTTONTEXT = '" + buf + "'");

                if (drs.Length > 0)
                {
                    clsStatic._MANAGER_YN = drs[0]["MANAGERYN"].ToString();
                }
            }
            else if (clsStatic._resouceType == "FROM" || clsStatic._resouceType == "GANBAN")
            {
                string[] strs = buf.Split('(');

                clsStatic._FROMLINE = strs[0];
                clsStatic._FROMLINE_DESC = strs[strs.Length - 1].Substring(0, strs[strs.Length - 1].Length - 1);
            }
            else if (clsStatic._resouceType == "TO")
            {
                string[] strs = buf.Split('(');

                clsStatic._TOLINE = strs[0];
                clsStatic._TOLINE_DESC = strs[strs.Length - 1].Substring(0, strs[strs.Length - 1].Length - 1);
            }
            else if (clsStatic._resouceType == "ITEMTYPE")
            {
                string[] strs = buf.Split('(');

                clsStatic._ITEMTYPE = strs[strs.Length - 1].Substring(0, strs[strs.Length - 1].Length - 1);
                clsStatic._ITEMTYPE_DESC = strs[0];
            }
            clsStatic._dialogValue = buf;

            this.Close();
        }
    }
}
