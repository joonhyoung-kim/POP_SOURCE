﻿using MetroFramework.Forms;
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
    public partial class frmLogin : Form
    {
        public frmLogin()
        {
            int x = Screen.PrimaryScreen.Bounds.Width;
            int y = Screen.PrimaryScreen.Bounds.Height;

            if(x > 1280 && y > 1024 )
            {
                clsStatic._FormsFullScreen = true;
            }

            InitializeComponent();

            clsStatic._MACADDRESS = clsStatic.getDefalutMacAddress();
            DataTable dt = clsLabelSet.getBCRPort(clsStatic._MACADDRESS);
            DataTable badFlagdt = clsLabelSet.getBadFlag(clsStatic._DIVISION_CD, clsStatic._COMPANY_CD);
            if(badFlagdt.Rows.Count > 0)
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

                string[] strsLogin = dt.Rows[0]["LOGINREMEMBER"].ToString().Split('^');
                if(strsLogin.Length == 5)
                {
                    clsStatic._USER_ID = strsLogin[0];
                    clsStatic._USER_NAME = strsLogin[1];
                    clsStatic._RESOURCE_CD = strsLogin[2];
                    clsStatic._RESOURCE_TEXT = strsLogin[3];
                    clsStatic._MANAGER_YN = strsLogin[4];

                    btnUser.Text = clsStatic._USER_NAME + "(" + clsStatic._USER_ID + ")";
                    if (strsLogin[2] == "PALLET")
                    {
                        btnLine.Text = "Pallet구성";
                    }
                    else if (strsLogin[2] == "재고이동/공정이동")
                    {
                        btnLine.Text = "재고이동/공정이동";
                    }
                    else if (strsLogin[2] == "간판라벨발행")
                    {
                        btnLine.Text = "간판라벨발행";
                    }
                    else if (strsLogin[2] == "자재입고")
                    {
                        btnLine.Text = "자재입고";
                    }
                    else if (strsLogin[2] == "원자재불출")
                    {
                        btnLine.Text = "원자재불출";
                    }
                    else if (strsLogin[2] == "출하처리")
                    {
                        btnLine.Text = "출하처리";
                    }
                    else if (strsLogin[2] == "공정품불출")
                    {
                        btnLine.Text = "공정품불출";
                    }
                    else if (strsLogin[2] == "생산이력조회")
                    {
                        btnLine.Text = "생산이력조회";
                    }
                    else
                    {
                        btnLine.Text = clsStatic._RESOURCE_TEXT + "(" + clsStatic._RESOURCE_CD + ")";
                    }
                }

                string[] strsLine = dt.Rows[0]["LINEREMEMBER"].ToString().Split('^');
                if (strsLine.Length == 4)
                {
                    clsStatic._FROMLINE = strsLine[0];
                    clsStatic._FROMLINE_DESC = strsLine[1];
                    clsStatic._TOLINE = strsLine[2];
                    clsStatic._TOLINE_DESC = strsLine[3];
                }
            }
            else
            {
                frmPrintConfig frm = new frmPrintConfig();
                frm.ShowDialog();
                this.Close();
            }
        }

        private void bcrremember()
        {
            if (clsStatic._USEMANAGEMENT == "PRODUCT_COMPLETE" || clsStatic._USEMANAGEMENT == "PRODUCT_INPUT")
            {
                clsStatic._LOGINREMEMBER = clsStatic._USER_ID + "^" + clsStatic._USER_NAME + "^" + clsStatic._RESOURCE_CD + "^" + clsStatic._RESOURCE_TEXT + "^" + clsStatic._MANAGER_YN;
            }
            else
            {
                if (btnLine.Text == "자재입고")
                {
                    clsStatic._RESOURCE_TEXT = "자재입고";
                    clsStatic._RESOURCE_CD = "자재입고";
                }
                else if (btnLine.Text == "원자재불출")
                {
                    clsStatic._RESOURCE_TEXT = "원자재불출";
                    clsStatic._RESOURCE_CD = "원자재불출";
                }
                else if (btnLine.Text == "Pallet구성")
                {
                    clsStatic._RESOURCE_TEXT = "PALLET";
                    clsStatic._RESOURCE_CD = "PALLET";
                    clsStatic._STOCK_TYPE_NAME = "팔레트";
                }
                else if (btnLine.Text == "재고이동")
                {
                    clsStatic._RESOURCE_TEXT = "재고이동";
                    clsStatic._RESOURCE_CD = "재고이동";
                }
                else if (btnLine.Text == "재고이동/공정이동")
                {
                    clsStatic._RESOURCE_TEXT = "재고이동/공정이동";
                    clsStatic._RESOURCE_CD = "재고이동/공정이동";
                }
                else if (btnLine.Text == "출하처리")
                {
                    clsStatic._RESOURCE_TEXT = "출하처리";
                    clsStatic._RESOURCE_CD = "출하처리";
                }
                else if (btnLine.Text == "공정품불출")
                {
                    clsStatic._RESOURCE_TEXT = "공정품불출";
                    clsStatic._RESOURCE_CD = "공정품불출";
                }
                else if (btnLine.Text == "생산이력조회")
                {
                    clsStatic._RESOURCE_TEXT = "생산이력조회";
                    clsStatic._RESOURCE_CD = "생산이력조회";
                }
                clsStatic._LOGINREMEMBER = clsStatic._USER_ID + "^" + clsStatic._USER_NAME + "^" + clsStatic._RESOURCE_CD + "^" + clsStatic._RESOURCE_TEXT + "^" + clsStatic._MANAGER_YN;
            }

            clsLabelSet.setBCRPort();
        }

        private void btnLogin_Click(object sender, EventArgs e)
        {
            if(btnUser.Text == "NODATA" || btnLine.Text == "NODATA")
            {
                frmMessage frm = new frmMessage("작업라인과 사원번호를 입력하여 주세요!", "AUTOCLOSE");
                frm.ShowDialog();
                return;
            }

            bcrremember();
            this.Visible = false;

            if (clsStatic._USEMANAGEMENT == "PRODUCT_COMPLETE")
            {
                frmMainProductComplete frm = new frmMainProductComplete();
                frm.ShowDialog();
            }
            else if (clsStatic._USEMANAGEMENT == "PRODUCT_INPUT")
            {
                clsStatic._STOCK_TYPE = "WO";  // 대차 처리임으로 공정이동(WO)
                frmCommonStockSelect frm = new frmCommonStockSelect("대차재고이동");
                frm.ShowDialog();
            }
            else
            {
                if (btnLine.Text == "자재입고")
                {
                    clsStatic._STOCK_TYPE = "MRTN";
                    clsStatic._STOCK_TYPE_NAME = "자재입고";
                    frmCommonStockSelect frm = new frmCommonStockSelect("자재입고");
                    frm.ShowDialog();
                }
                else if (btnLine.Text == "원자재불출")
                {
                    clsStatic._STOCK_TYPE = "MAT";
                    clsStatic._STOCK_TYPE_NAME = "원자재불출";
                    frmCommonStockSelect frm = new frmCommonStockSelect("원자재불출");
                    frm.ShowDialog();
                }
                else if (btnLine.Text == "공정품불출")
                {
                    clsStatic._STOCK_TYPE = "WO";
                    clsStatic._STOCK_TYPE_NAME = "공정품불출";
                    frmCommonStockSelect frm = new frmCommonStockSelect("공정품불출");
                    frm.ShowDialog();
                }
                else if(btnLine.Text == "Pallet구성")
                {
                    frmCommonStockSelect frm = new frmCommonStockSelect("Pallet구성");
                    //frmPallet frm = new frmPallet();
                    frm.ShowDialog();
                }
                else if (btnLine.Text == "재고이동")
                {
                    frmCommonStockSelect frm = new frmCommonStockSelect("재고이동");
                    frm.ShowDialog();
                }
                else if (btnLine.Text == "재고이동/공정이동")
                {
                    frmStockType frm = new frmStockType();
                    frm.ShowDialog();
                }
                else if (btnLine.Text == "공정이동")
                {
                    frmCommonStockSelect frm = new frmCommonStockSelect("공정이동");
                    frm.ShowDialog();
                }
                else if (btnLine.Text == "간판라벨발행")
                {
                    clsStatic._FROMLINE = "";
                    clsStatic._FROMLINE_DESC = "";
                    clsStatic._TOLINE = "";
                    clsStatic._TOLINE_DESC = "";
                    frmGanban frm = new frmGanban();
                    frm.ShowDialog();
                }
                else if (btnLine.Text == "출하처리")
                {
                    clsStatic._STOCK_TYPE_NAME = "출하처리";
                    frmCommonStockSelect frm = new frmCommonStockSelect("출하처리");
                    frm.ShowDialog();
                }
                else if (btnLine.Text == "생산이력조회")
                {
                    clsStatic._STOCK_TYPE_NAME = "생산이력조회";
                    frmCTPalletSearch frm = new frmCTPalletSearch();
                    frm.ShowDialog();
                }
            }

            this.Close();
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void btnLine_Click(object sender, EventArgs e)
        {
            clsStatic._resouceType = "LINE";
            clsStatic._dialogValue = "";
            frmCommonSelect frm = new frmCommonSelect("라인");
            frm.ShowDialog();

            if(clsStatic._dialogValue != "")
            {
                btnLine.Text = clsStatic._dialogValue;
            }

            clsStatic._resouceType = "";
            clsStatic._dialogValue = "";
        }

        private void btnUser_Click(object sender, EventArgs e)
        {
            clsStatic._resouceType = "USER";
            clsStatic._dialogValue = "";
            frmCommonSelect frm = new frmCommonSelect("사용자");
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                btnUser.Text = clsStatic._dialogValue;
            }

            clsStatic._resouceType = "";
            clsStatic._dialogValue = "";
        }
    }
}
