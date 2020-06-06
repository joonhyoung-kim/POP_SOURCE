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

        ucMaterialGR _ucMaterialGR; //자재입고
        ucMaterialGI _ucMaterialGI; //원자재불출
        ucProductMove _ucProductMove; //재고이동/공정이동
        ucProductStatus _ucProductStatus; //재고현황
        ucGanbanSplit _ucGanbanSplit; //간판 분할
        ucGanbanManual _ucGanbanManual; //반납간판발행

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
            _ucMaterialGR = new ucMaterialGR(); 
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
            btnFromLoc.Text = clsStatic._FROMLINE + "(" + clsStatic._FROMLINE_DESC + ")";
            btnToLoc.Enabled = true;
            btnToLoc.Text = clsStatic._TOLINE + "(" + clsStatic._TOLINE_DESC + ")";

            //3. 화면별 설정
            if (selectMenu == "자재입고")
            {
                clsStatic._STOCK_TYPE = "MRTN";

                //From 창고 버튼 비활성화
                btnFromLoc.Enabled = false;
                btnFromLoc.Text = "-";
            }
            else if (selectMenu == "원자재불출")
            {
                clsStatic._STOCK_TYPE = "MAT";
                //To 창고 버튼 비활성화
                btnToLoc.Enabled = false;
                btnToLoc.Text = "-";
            }
            else if (selectMenu == "공정품불출")
            {
                clsStatic._STOCK_TYPE = "WO";
            }
            else if (selectMenu == "재고이동/공정이동")
            {
                //콤보박스 Set
                string[] data = { "재고이동", "자재반납", "공정이동", "제품이동", "재고현황" };

                comboOption.Items.AddRange(data);
                comboOption.SelectedIndex = 0;
                comboOption.Enabled = true;
                clsStatic._STOCK_TYPE = "MAT"; //재고이동
            }
            else if (selectMenu == "간판분할")
            {
                // 간판분할 FROM/TO 창고 비활성화
                btnFromLoc.Enabled = false;
                btnFromLoc.Text = "-";
                btnToLoc.Enabled = false;
                btnToLoc.Text = "-";
            }
            else if (selectMenu == "반납라벨발행")
            {
                // 간판분할 FROM 창고 비활성화
                btnFromLoc.Enabled = false;
                btnFromLoc.Text = "-";
                if (clsStatic._TOLINE == "")
                {
                    btnToLoc.Text = "반납 대상 창고";
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


            //선택화면 활성화
            if (menu == "자재입고")
            {
                _ucMaterialGR.Visible = true;
            }
            else if(menu == "원자재불출")
            {
                _ucMaterialGI.Visible = true;
            }
            else if(menu == "재고이동/공정이동")
            {
                _ucProductMove.Visible = true;
            }
            else if (menu == "간판분할")
            {
                _ucGanbanSplit.Visible = true;
            }
            else if (menu == "반납라벨발행")
            {
                _ucGanbanManual.Visible = true;
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

                btnFromLoc.Text = clsStatic._FROMLINE + "(" + clsStatic._FROMLINE_DESC + ")";

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

            frmCommonSelect frm = new frmCommonSelect("WMS");
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                //선택한 라인 정보 파일에 저장
                clsXML.UpdateXML("LINE");
                LoadXmlInfo();

                btnToLoc.Text = clsStatic._TOLINE + "(" + clsStatic._TOLINE_DESC + ")";
                //Sub 화면 초기화
                InitSubMenu();
            }

            clsStatic._resouceType = "";
            clsStatic._dialogValue = "";
        }

        //Sub화면 초기화
        private void InitSubMenu()
        {
            if (clsStatic._WMSMENU == "자재입고")
            {
                _ucMaterialGR.init();
            }
            else if (clsStatic._WMSMENU == "원자재불출")
            {
                _ucMaterialGI.init();
            }
            else if (clsStatic._WMSMENU == "간판분할")
            {
                _ucGanbanSplit.init();
            }
            else if (clsStatic._WMSMENU == "재고이동/공정이동")
            {
                _ucProductMove.init();
            }
            else if (clsStatic._WMSMENU == "반납간판발행")
            {
                _ucGanbanManual.init();
            }
            
        }

        //콤보박스 : 이동/반납 옵션 변경될 경우
        private void comboOption_SelectedIndexChanged(object sender, EventArgs e)
        {
            if(comboOption.Text == "재고이동")
            {
                clsStatic._STOCK_TYPE = "MAT";

                _ucProductMove.Visible = true;
                _ucProductStatus.Visible = false;
            }
            else if (comboOption.Text == "자재반납")
            {
                clsStatic._STOCK_TYPE = "MRTN";

                _ucProductMove.Visible = true;
                _ucProductStatus.Visible = false;
            }
            else if (comboOption.Text == "공정이동")
            {
                clsStatic._STOCK_TYPE = "WO";

                _ucProductMove.Visible = true;
                _ucProductStatus.Visible = false;
            }
            else if (comboOption.Text == "제품이동")
            {
                clsStatic._STOCK_TYPE = "SO";

                _ucProductMove.Visible = true;
                _ucProductStatus.Visible = false;
            }
            else
            {
                _ucProductMove.Visible = false;
                _ucProductStatus.Visible = true;
            }

            
        }

        //닫기
        private void btnClose_Click(object sender, EventArgs e)
        {
            if (_palletid != "")
            {
                this.Close();
                return;
            }

            frmMessage frm = new frmMessage("WMS 화면을 종료 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                this.Close();
            }
        }


    }
}
