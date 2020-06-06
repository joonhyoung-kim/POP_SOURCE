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
    public partial class frmWMSProcess : Form
    {
        string move_type = "";
        string _palletid = "";
        public string _workorder = "";

        ucMaterialGRNew _ucMaterialGR; //자재입고
        ucMaterialGI _ucMaterialGI; //원자재불출
        ucProductMove _ucProductMove; //재고이동/공정이동
        ucProductStatus _ucProductStatus; //재고현황
        ucGanbanSplit _ucGanbanSplit; //간판 분할
        ucGanbanManual _ucGanbanManual; //반납간판발행
        ucProductShipment _ucProductShipment; //출하처리
        ucGanbanUse _ucGanbanUse; //간판소진
        ucGanbanUseCancel _ucGanbanUseCancel; //간판소진취소
        ucGanbanInput _ucGanbanInput; //자재투입

        public frmWMSProcess()
        {
            InitializeComponent();

            //Sub 화면설정
            setSubMenu();

            //이전 선택 정보 로드
            LoadXmlInfo();

            //화면 표시 설정
            setDisplay(clsStatic._WMSMENU);

            //화면 활성화
            changeActiveDisplay(clsStatic._WMSMENU);

        }

        public frmWMSProcess(string menu, string workorder)
        {
            InitializeComponent();

            btnMenuSelect.Enabled = false;
            _workorder = workorder;

            //Sub 화면설정
            setSubMenu();

            //이전 선택 정보 로드
            //LoadXmlInfo();

            clsStatic._WMSMENU = menu;
            clsStatic._FROMLINE = "";
            clsStatic._FROMLINE_DESC = "";
            clsStatic._TOLINE = "";
            clsStatic._TOLINE_DESC = "";

            //화면 표시 설정
            setDisplay(clsStatic._WMSMENU);

            //화면 활성화
            changeActiveDisplay(clsStatic._WMSMENU);

        }

        //config 파일 로드
        private void LoadXmlInfo()
        {
            DataTable dt = clsXML.ReadXML();

            clsStatic._WMSMENU = dt.Rows[0]["MENU_ID"].ToString();
            clsStatic._FROMLINE = dt.Rows[0]["FROMLINE"].ToString();
            clsStatic._FROMLINE_DESC = dt.Rows[0]["FROMDESC"].ToString();
            clsStatic._TOLINE = dt.Rows[0]["TOLINE"].ToString();
            clsStatic._TOLINE_DESC = dt.Rows[0]["TODESC"].ToString();
        }
        
        //Sub 화면 선언
        private void setSubMenu()
        {
            //자재입고
            _ucMaterialGR = new ucMaterialGRNew(); 
            pnlMain.Controls.Add(_ucMaterialGR);
            _ucMaterialGR.Dock = DockStyle.Fill;

            //원자재불출
            _ucMaterialGI = new ucMaterialGI();
            pnlMain.Controls.Add(_ucMaterialGI);
            _ucMaterialGI.Dock = DockStyle.Fill;

            //재고이동/공정이동
            _ucProductMove = new ucProductMove();
            pnlMain.Controls.Add(_ucProductMove);
            _ucProductMove.Dock = DockStyle.Fill;

            //재고현황
            _ucProductStatus = new ucProductStatus();
            pnlMain.Controls.Add(_ucProductStatus);
            _ucProductStatus.Dock = DockStyle.Fill;

            //간판 분할
            _ucGanbanSplit = new ucGanbanSplit();
            pnlMain.Controls.Add(_ucGanbanSplit);
            _ucGanbanSplit.Dock = DockStyle.Fill;

            //반납간판발행
            _ucGanbanManual = new ucGanbanManual();
            pnlMain.Controls.Add(_ucGanbanManual);
            _ucGanbanManual.Dock = DockStyle.Fill;

            //출하처리
            _ucProductShipment = new ucProductShipment();
            pnlMain.Controls.Add(_ucProductShipment);
            _ucProductShipment.Dock = DockStyle.Fill;

            //간판소진
            _ucGanbanUse = new ucGanbanUse();
            pnlMain.Controls.Add(_ucGanbanUse);
            _ucGanbanUse.Dock = DockStyle.Fill;

            //간판소진취소
            _ucGanbanUseCancel = new ucGanbanUseCancel();
            pnlMain.Controls.Add(_ucGanbanUseCancel);
            _ucGanbanUseCancel.Dock = DockStyle.Fill;

            //자재투입
            _ucGanbanInput = new ucGanbanInput(_workorder);
            pnlMain.Controls.Add(_ucGanbanInput);
            _ucGanbanInput.Dock = DockStyle.Fill;

        }

        //화면선택 버튼 클릭
        private void btnMenuSelect_Click(object sender, EventArgs e)
        {
            clsStatic._resouceType = "LINE";
            clsStatic._dialogValue = "";

            frmCommonSelect frm = new frmCommonSelect("라인");
            frm.ShowDialog();


            if (clsStatic._dialogValue != "")
            {
                clsStatic._WMSMENU = clsStatic._dialogValue;
                
                //선택한 화면 정보 파일에 저장
                clsXML.UpdateXML("MENU");
                LoadXmlInfo();

                setDisplay(clsStatic._WMSMENU);

                //Sub 화면 초기화
                InitSubMenu();
            }

            clsStatic._resouceType = "";
            clsStatic._dialogValue = "";
        }

        //화면 표시 설정
        private void setDisplay (string selectMenu)
        {
            //0. 콤보박스 초기화
            comboOption.Items.Clear();
            comboOption.Enabled = false;
            comboOption.Text = null;

            //1. 화면 활성화
            changeActiveDisplay(selectMenu);

            //2. From, To 창고 버튼 (비)활성화
            btnFromLoc.Enabled = true;
            btnFromLoc.Text = clsStatic._FROMLINE + "\n(" + clsStatic._FROMLINE_DESC + ")";
            btnToLoc.Enabled = true;
            btnToLoc.Text = clsStatic._TOLINE + "\n(" + clsStatic._TOLINE_DESC + ")";

            //3. 화면별 설정
            if (selectMenu == "Mat. Receiving")
            {
                clsStatic._STOCK_TYPE = "MRTN";

                //From 창고 버튼 비활성화
                btnFromLoc.Enabled = false;
                btnFromLoc.Text = "-";
            }
            else if (selectMenu == "Mat. Release")
            {
                clsStatic._STOCK_TYPE = "MAT";
                //To 창고 버튼 비활성화
                btnToLoc.Enabled = false;
                btnToLoc.Text = "-";
            }
            else if (selectMenu == "Move/Return")
            {
                //콤보박스 Set
                string[] data = { "Stock Move", "Mat. Return", "Process Move", "Product Move", "Sales Return", "Stock Status" };

                comboOption.Items.AddRange(data);
                comboOption.SelectedIndex = 0;
                comboOption.Enabled = true;
                clsStatic._STOCK_TYPE = "MAT"; //재고이동
            }
            else if (selectMenu == "Label Split")
            {
                // 간판분할 FROM/TO 창고 비활성화
                btnFromLoc.Enabled = false;
                btnFromLoc.Text = "-";
                btnToLoc.Enabled = false;
                btnToLoc.Text = "-";
            }
            else if (selectMenu == "Label Issue")
            {
                // FROM 창고 비활성화
                btnFromLoc.Enabled = false;
                btnFromLoc.Text = "-";
                if (clsStatic._TOLINE == "")
                {
                    btnToLoc.Text = "Return Warehouse";
                }
            }
            else if (selectMenu == "Shipment")
            {
                //창고 버튼 비활성화
                btnToLoc.Enabled = false;
                btnToLoc.Text = "-";
                clsStatic._STOCK_TYPE = "SRTN";
            }
            else if (selectMenu == "Label Exhaust")
            {
                //창고 버튼 비활성화
                btnFromLoc.Enabled = false;
                btnFromLoc.Text = "-";
                btnToLoc.Enabled = false;
                btnToLoc.Text = "-";
            }
            else if (selectMenu == "Exhaust Cancel")
            {
                //창고 버튼 비활성화
                btnFromLoc.Enabled = false;
                btnFromLoc.Text = "-";
                btnToLoc.Enabled = false;
                btnToLoc.Text = "-";
            }
            else if (selectMenu == "Mat. Input")
            {
                //창고 버튼 비활성화
                btnFromLoc.Enabled = false;
                btnFromLoc.Text = "-";
                if (clsStatic._RESOURCE_CD == "")
                {
                    btnToLoc.Text = "Resource";
                }
                else
                {
                    btnToLoc.Text = clsStatic._RESOURCE_CD + "\n(" + clsStatic._RESOURCE_TEXT + ")";
                }
            }
            //4. 선택화면 명 표시
            btnMenuSelect.Text = selectMenu;
        }

        //활성화 화면 변경
        private void changeActiveDisplay(string menu)
        {
            //전체화면 비활성화
            _ucMaterialGR.Visible = false;
            _ucMaterialGI.Visible = false;
            _ucProductMove.Visible = false;
            _ucProductStatus.Visible = false;
            _ucGanbanSplit.Visible = false;
            _ucGanbanManual.Visible = false;
            _ucProductShipment.Visible = false;
            _ucGanbanUse.Visible = false;
            _ucGanbanUseCancel.Visible = false;
            _ucGanbanInput.Visible = false;



            //선택화면 활성화
            if (menu == "Mat. Receiving")
            {
                _ucMaterialGR.Visible = true;
            }
            else if(menu == "Mat. Release")
            {
                _ucMaterialGI.Visible = true;
            }
            else if(menu == "Move/Return")
            {
                _ucProductMove.Visible = true;
            }
            else if (menu == "Label Split")
            {
                _ucGanbanSplit.Visible = true;
            }
            else if (menu == "Label Issue")
            {
                _ucGanbanManual.Visible = true;
            }
            else if (menu == "Shipment")
            {
                _ucProductShipment.Visible = true;
            }
            else if (menu == "Label Exhaust")
            {
                _ucGanbanUse.Visible = true;
            }
            else if(menu =="Exhaust Cancel")
            {
                _ucGanbanUseCancel.Visible = true;
            }
            else if (menu == "Mat. Input")
            {
                _ucGanbanInput.Visible = true;
            }
        }

        //From 창고 선택
        private void btnFromLoc_Click(object sender, EventArgs e)
        {
            clsStatic._resouceType = "FROM";
            clsStatic._dialogValue = "";

            frmCommonSelect frm = new frmCommonSelect("WMS");
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                //선택한 라인 정보 파일에 저장
                clsXML.UpdateXML("LINE");
                LoadXmlInfo();

                btnFromLoc.Text = clsStatic._FROMLINE + "\n(" + clsStatic._FROMLINE_DESC + ")";

                //Sub 화면 초기화
                InitSubMenu();
            }

            clsStatic._resouceType = "";
            clsStatic._dialogValue = "";
        }

        //To 창고 선택
        private void btnToLoc_Click(object sender, EventArgs e)
        {
            clsStatic._resouceType = "TO";
            clsStatic._dialogValue = "";

            string stockTypeTmp = "";
            string mgmtTmp = "";
            string resTypeTmp = "";

            if (btnMenuSelect.Text.Equals("Label Issue"))
            {
                stockTypeTmp = clsStatic._STOCK_TYPE;
                clsStatic._STOCK_TYPE = "";
            }
            else if (btnMenuSelect.Text.Equals("Mat. Input"))
            {
                mgmtTmp = clsStatic._USEMANAGEMENT;
                clsStatic._USEMANAGEMENT = "PRODUCT_COMPLETE";
                resTypeTmp = clsStatic._resouceType;
                clsStatic._resouceType = "LINE";
            }

            frmCommonSelect frm = new frmCommonSelect("WMS");
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                //선택한 라인 정보 파일에 저장
                clsXML.UpdateXML("LINE");
                LoadXmlInfo();

                if (btnMenuSelect.Text.Equals("Mat. Input"))
                {
                    btnToLoc.Text = clsStatic._RESOURCE_CD + "\n(" + clsStatic._RESOURCE_TEXT + ")";
                }
                else
                {
                    btnToLoc.Text = clsStatic._TOLINE + "\n(" + clsStatic._TOLINE_DESC + ")";
                }
                //Sub 화면 초기화
                InitSubMenu();
            }

            if (btnMenuSelect.Text.Equals("Label Issue"))
            {
                clsStatic._STOCK_TYPE = stockTypeTmp;
            }
            else if (btnMenuSelect.Text.Equals("Mat. Input"))
            {
                clsStatic._USEMANAGEMENT = mgmtTmp;
                clsStatic._resouceType = resTypeTmp;
            }

            clsStatic._resouceType = "";
            clsStatic._dialogValue = "";
        }

        //Sub화면 초기화
        private void InitSubMenu()
        {
            if (clsStatic._WMSMENU == "Mat. Receiving")
            {
                _ucMaterialGR.init();
            }
            else if (clsStatic._WMSMENU == "Mat. Release")
            {
                _ucMaterialGI.init();
            }
            else if (clsStatic._WMSMENU == "Label Split")
            {
                _ucGanbanSplit.init();
            }
            else if (clsStatic._WMSMENU == "Move/Return")
            {
                _ucProductMove.init();
            }
            else if (clsStatic._WMSMENU == "Label Issue")
            {
                _ucGanbanManual.init();
            }
            else if (clsStatic._WMSMENU == "Shipment")
            {
                _ucProductShipment.init();
            }
            else if (clsStatic._WMSMENU == "Label Exhaust")
            {
                _ucGanbanUse.init();
            }
            else if (clsStatic._WMSMENU == "Exhaust Cancel")
            {
                _ucGanbanUseCancel.init();
            }
            
        }

        //콤보박스 : 이동/반납 옵션 변경될 경우
        private void comboOption_SelectedIndexChanged(object sender, EventArgs e)
        {
            if(comboOption.Text == "Stock Move")
            {
                clsStatic._STOCK_TYPE = "MAT";

                clsStatic._FROMLINE = "";
                clsStatic._FROMLINE_DESC = "";
                clsStatic._TOLINE = "";
                clsStatic._TOLINE_DESC = "";

                btnFromLoc.Text = "";
                btnToLoc.Text = "";

                //버튼명 변경
                _ucProductMove.btnMove.Text = "MOVE";

                _ucProductMove.Visible = true;
                _ucProductStatus.Visible = false;
            }
            else if (comboOption.Text == "Mat. Return")
            {
                clsStatic._STOCK_TYPE = "MRTN";

                clsStatic._FROMLINE = "";
                clsStatic._FROMLINE_DESC = "";
                clsStatic._TOLINE = "";
                clsStatic._TOLINE_DESC = "";

                btnFromLoc.Text = "";
                btnToLoc.Text = "";

                //버튼명 변경
                _ucProductMove.btnMove.Text = "RETURN";

                _ucProductMove.Visible = true;
                _ucProductStatus.Visible = false;
            }
            else if (comboOption.Text == "Process Move")
            {
                clsStatic._STOCK_TYPE = "WO";

                clsStatic._FROMLINE = "";
                clsStatic._FROMLINE_DESC = "";
                clsStatic._TOLINE = "";
                clsStatic._TOLINE_DESC = "";

                btnFromLoc.Text = "";
                btnToLoc.Text = "";

                //버튼명 변경
                _ucProductMove.btnMove.Text = "MOVE";

                _ucProductMove.Visible = true;
                _ucProductStatus.Visible = false;
            }
            else if (comboOption.Text == "Product Move")
            {
                clsStatic._STOCK_TYPE = "SO";

                clsStatic._FROMLINE = "";
                clsStatic._FROMLINE_DESC = "";
                clsStatic._TOLINE = "";
                clsStatic._TOLINE_DESC = "";

                btnFromLoc.Text = "";
                btnToLoc.Text = "";

                //버튼명 변경
                _ucProductMove.btnMove.Text = "MOVE";

                _ucProductMove.Visible = true;
                _ucProductStatus.Visible = false;
            }
            else if (comboOption.Text == "Sales Return")
            {
                clsStatic._STOCK_TYPE = "SRTN";

                clsStatic._FROMLINE = "";
                clsStatic._FROMLINE_DESC = "";
                clsStatic._TOLINE = "";
                clsStatic._TOLINE_DESC = "";

                //버튼명 변경
                _ucProductMove.btnMove.Text = "RETURN";

                btnFromLoc.Text = "";
                btnToLoc.Text = "";

                _ucProductMove.Visible = true;
                _ucProductStatus.Visible = false;
            }
            else
            {
                _ucProductMove.Visible = false;
                _ucProductStatus.Visible = true;
            }

            _ucProductMove.init();
        }

        //닫기
        private void btnClose_Click(object sender, EventArgs e)
        {
            if (_palletid != "")
            {
                this.Close();
                return;
            }
            //WMS 화면을 종료 하시겠습니까?
            frmMessage frm = new frmMessage("Do you want to exit the WMS screen?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                this.Close();
            }
        }


    }
}
