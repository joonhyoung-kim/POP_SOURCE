﻿using SmartMom_Lib;
using System;
using System.Data;
using System.Deployment.Application;
using System.Reflection;
using System.Windows.Forms;

namespace SmartMOM_POP
{
    public partial class frmLogin : Form
    {
        DataTable _divisionDt = new DataTable();
        int _divisionCnt = 0;
        public frmLogin()
        {
            InitializeComponent();
            //LOCALHOST
           /* clsStatic._serviceSelectURL = "http://localhost:10003/TU_Platform/pop/request";
            clsStatic._serviceUsertURL = "http://localhost:10003/TU_Platform/pop/request/upsert";*/

            clsStatic._serviceSelectURL = "http://52.78.211.135:10003/TU_Platform/pop/request";
            clsStatic._serviceUsertURL = "http://52.78.211.135:10003/TU_Platform/pop/request/upsert";
            //이베스코(운영) 내부
            // clsStatic._serviceSelectURL = "http://14.34.186.47:8100/TU_Platform/pop/request";
            // clsStatic._serviceUsertURL = "http://14.34.186.47:8100/TU_Platform/pop/request/upsert";

            //이베스코(운영) 외부
            /*clsStatic._serviceSelectURL = "http://ebesco-smartmom.iptime.org:8100/TU_Platform/pop/request";
              clsStatic._serviceUsertURL = "http://ebesco-smartmom.iptime.org:8100/TU_Platform/pop/request/upsert";*/

            //AD인터내셔널(운영)
            /* clsStatic._serviceSelectURL = "http://adint-smartmom.iptime.org:8100/TU_Platform/pop/request";
             clsStatic._serviceUsertURL = "http://adint-smartmom.iptime.org:8100/TU_Platform/pop/request/upsert";*/

            _divisionDt = clsStatic.getDivisionList(); //DIVISION 정보를 _divisionDt에 담는다

            if(_divisionDt.Rows.Count ==0) //DIVISON 목록이 1개도 없다면
            {
                frmMessage frm = new frmMessage("DIVISION 정보가 존재하지 않습니다.", "OK");
                frm.ShowDialog();
                this.Close(); //폼을 닫는다
                return;
            }

            clsStatic._DIVISION_CD = _divisionDt.Rows[_divisionCnt]["DIVISIONCD"].ToString(); // 
            btnDivision.Text = _divisionDt.Rows[_divisionCnt]["DIVISIONNAME"].ToString();

            init_process();
           // clsStatic._CHKUSEMANAGEMENT = clsStatic._USEMANAGEMENT;
        }

        private void btnDivision_Click(object sender, EventArgs e)
        {
            _divisionCnt++;

            if(_divisionCnt >= _divisionDt.Rows.Count)
            {
                _divisionCnt = 0;
            }

            clsStatic._DIVISION_CD = _divisionDt.Rows[_divisionCnt]["DIVISIONCD"].ToString();
            btnDivision.Text = _divisionDt.Rows[_divisionCnt]["DIVISIONNAME"].ToString();
            init_process();
        }

        private void init_process()
        {
            clsStatic._MACADDRESS = clsStatic.getDefalutMacAddress();
            DataTable dt = clsLabelSet.getBCRPort(clsStatic._MACADDRESS);
            DataTable badFlagdt = clsLabelSet.getBadFlag(clsStatic._DIVISION_CD, clsStatic._COMPANY_CD);

            //불량코드 리스트
            clsStatic._BADCODE_LIST = clsStatic.getBadCodeList();

            if (badFlagdt.Rows.Count > 0)
            {
                clsStatic._BADQTYFLAG = badFlagdt.Rows[0]["BADQTYFLAG"].ToString().Trim();
            }

            string version = getVersion();

            if (dt.Rows.Count > 0)
            {

                lblTitle.Text = "SmartPOP 로그인(" + dt.Rows[0]["USEMANAGEMENT"].ToString() + ")" + " V " + version;
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


                string[] strsLogin = dt.Rows[0]["LOGINREMEMBER"].ToString().Split('^');
                if (strsLogin.Length == 5)
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
                    else if (strsLogin[2] == "간판라벨분할")
                    {
                        btnLine.Text = "간판라벨분할";
                    }
                    else if (strsLogin[2] == "자재입고")
                    {
                        btnLine.Text = "자재입고";
                    }
                    else if (strsLogin[2] == "출발처리")
                    {
                        btnLine.Text = "출발처리";
                    }
                    else if (strsLogin[2] == "원자재불출")
                    {
                        btnLine.Text = "원자재불출";
                    }
                    else if (strsLogin[2] == "간판라벨수동생성")
                    {
                        btnLine.Text = "간판라벨수동생성";
                    }
                    else if (strsLogin[2] == "출하처리")
                    {
                        btnLine.Text = "출하처리";
                    }
                    else if (strsLogin[2] == "공정품불출")
                    {
                        btnLine.Text = "공정품불출";
                    }
                    else if (strsLogin[2] == "BIN이동")
                    {
                        btnLine.Text = "BIN이동";
                    }
                    else if (strsLogin[2] == "간판라벨소진")
                    {
                        btnLine.Text = "간판라벨소진";
                    }
                    else if (strsLogin[2] == "재고현황")
                    {
                        btnLine.Text = "재고현황";
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

        private string getVersion()
        {
            try
            {
                //ClickOnce의 버젼 취득    
                return ApplicationDeployment.CurrentDeployment.CurrentVersion.ToString();
            }
            catch (System.Deployment.Application.DeploymentException ex)
            {
                //ClickOnce배포가 아니므로 어셈블리버젼을 취득
                return Assembly.GetExecutingAssembly().GetName().Version.ToString();
            }
            catch (Exception ex)
            {
                return "확인불가";
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
                else if (btnLine.Text == "출발처리")
                {
                    clsStatic._RESOURCE_TEXT = "출발처리";
                    clsStatic._RESOURCE_CD = "출발처리";
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
                }
                else if (btnLine.Text == "재고이동")
                {
                    clsStatic._RESOURCE_TEXT = "재고이동";
                    clsStatic._RESOURCE_CD = "재고이동";
                }
                else if (btnLine.Text == "간판라벨수동생성")
                {
                    clsStatic._RESOURCE_TEXT = "간판라벨수동생성";
                    clsStatic._RESOURCE_CD = "간판라벨수동생성";
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
            //this.Visible = false;
            
            if (clsStatic._USEMANAGEMENT == "PRODUCT_COMPLETE")
            {
                /*   if (clsStatic._COMPANY_CD == "AD")
                   {
                       frmMainProductCompleteAD frm = new frmMainProductCompleteAD();
                       frm.ShowDialog();
                   }
                   else if (clsStatic._COMPANY_CD == "EBESCO")
                   {
                       frmMainProductCompleteEBESCO frm = new frmMainProductCompleteEBESCO();
                       frm.ShowDialog();
                   }*/
                frmMainProductCompleteAD frm = new frmMainProductCompleteAD();
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
                    frmCommonStockSelect frm = new frmCommonStockSelect("자재입고");
                    frm.ShowDialog();
                }
                else if (btnLine.Text == "출발처리")
                {
                    clsStatic._STOCK_TYPE = "MAT";
                    frmCommonStockSelect frm = new frmCommonStockSelect("출발처리");
                    frm.ShowDialog();
                }
                else if (btnLine.Text == "원자재불출")
                {
                    clsStatic._STOCK_TYPE = "MAT";
                    frmCommonStockSelect frm = new frmCommonStockSelect("원자재불출");
                    frm.ShowDialog();
                }
                else if (btnLine.Text == "공정품불출")
                {
                    clsStatic._STOCK_TYPE = "WO";
                    frmCommonStockSelect frm = new frmCommonStockSelect("공정품불출");
                    frm.ShowDialog();
                }
                //else if(btnLine.Text == "Pallet구성")
                //{
                //    frmCommonStockSelect frm = new frmCommonStockSelect("Pallet구성");
                //    //frmPallet frm = new frmPallet();
                //    frm.ShowDialog();
                //}
                else if (btnLine.Text == "재고현황")
                {
                    clsStatic._STOCK_TYPE = "";

                    //frmCommonStockSelect frm = new frmCommonStockSelect("재고현황");
                    frmStockType frm = new frmStockType("재고현황");
                    frm.ShowDialog();
                }
                else if (btnLine.Text == "재고이동")
                {
                    frmCommonStockSelect frm = new frmCommonStockSelect("재고이동");
                    frm.ShowDialog();
                }
                else if (btnLine.Text == "재고이동/공정이동")
                {
                    frmStockType frm = new frmStockType("공정이동");
                    frm.ShowDialog();
                }
                else if (btnLine.Text == "공정이동")
                {
                    frmCommonStockSelect frm = new frmCommonStockSelect("공정이동");
                    frm.ShowDialog();
                }
                else if (btnLine.Text == "간판라벨분할")
                {
                    clsStatic._FROMLINE = "";
                    clsStatic._FROMLINE_DESC = "";
                    clsStatic._TOLINE = "";
                    clsStatic._TOLINE_DESC = "";
                    frmGanbanSplit frm = new frmGanbanSplit();
                    frm.ShowDialog();
                }
                else if (btnLine.Text == "출하처리")
                {
                    frmProductGI frm = new frmProductGI();
                    frm.ShowDialog();
                }
                else if (btnLine.Text == "간판라벨수동생성")
                {
                    clsStatic._STOCK_TYPE = "";
                    frmCommonStockSelect frm = new frmCommonStockSelect("간판라벨수동생성");
                    frm.ShowDialog();
                }
                else if (btnLine.Text == "간판라벨소진")
                {
                    clsStatic._STOCK_TYPE = "";
                    frmCommonStockSelect frm = new frmCommonStockSelect("간판라벨소진");
                    frm.ShowDialog();
                }
            }
            
            //this.Close();
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
            string version = getVersion();
            lblTitle.Text = "SmartPOP 로그인(" + clsStatic._USEMANAGEMENT + ")" + " V " + version;

            clsStatic._resouceType = "";
            clsStatic._dialogValue = "";


            
                //frmLogin();
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

            DataTable dt = clsLabelSet.getBCRPort(clsStatic._MACADDRESS);
            DataTable badFlagdt = clsLabelSet.getBadFlag(clsStatic._DIVISION_CD, clsStatic._COMPANY_CD);
            if (badFlagdt.Rows.Count > 0)
            {
                clsStatic._BADQTYFLAG = badFlagdt.Rows[0]["BADQTYFLAG"].ToString().Trim();
            }

            string version = getVersion();

            if (dt.Rows.Count > 0)
            {
                lblTitle.Text = "SmartPOP 로그인(" + dt.Rows[0]["USEMANAGEMENT"].ToString() + ")" + " V " + version;
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
        }

        
    }
}
