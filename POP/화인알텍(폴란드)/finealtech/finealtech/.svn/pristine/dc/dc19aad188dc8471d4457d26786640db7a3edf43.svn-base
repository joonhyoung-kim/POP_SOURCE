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
    public partial class frmCommonStockSelect : Form
    {
        string _selectType = "";

        public frmCommonStockSelect(string selectType)
        {
            InitializeComponent();

            clsStatic._ITEMTYPE = "ALL";
            clsStatic._ITEMTYPE_DESC = "전체";

            if (selectType == "간판라벨발행")
            {
                lblFrom.Text = "현재창고";
                btnTo.Text = "-";
                btnTo.Enabled = false;
                btnItemType.Text = "-";
                btnItemType.Enabled = false;
                from_to_init("TO");
            }
            else if (selectType == "대차재고이동")
            {
                btnItemType.Text = "-";
                btnItemType.Enabled = false;
            }
            else if (selectType == "Pallet구성")
            {
                btnItemType.Text = "-";
                btnItemType.Enabled = false;
                clsStatic._STOCK_TYPE = "WO";
            }
            else if (selectType == "자재입고")
            {
                btnFrom.Text = "-";
                btnFrom.Enabled = false;
                lblTo.Text = "창고선택";
                btnItemType.Text = "-";
                btnItemType.Enabled = false;
                from_to_init("FROM");
            }
            else if (selectType == "원자재불출")
            {
                btnTo.Text = "-";
                btnTo.Enabled = false;
                btnItemType.Text = "-";
                btnItemType.Enabled = false;
                from_to_init("TO");
            }
            else if (selectType == "공정품불출")
            {
                btnTo.Text = "-";
                btnTo.Enabled = false;
                btnItemType.Text = "-";
                btnItemType.Enabled = false;
                from_to_init("TO");
            }
            else
            {
                clsStatic._FROMLINE = "";
                clsStatic._FROMLINE_DESC = "";
                clsStatic._TOLINE = "";
                clsStatic._TOLINE_DESC = "";
            }
            _selectType = selectType;
        }

        private void from_to_init(string flag)
        {
            if(flag == "FROM")
            {
                clsStatic._FROMLINE = "";
                clsStatic._FROMLINE_DESC = "";

                if(clsStatic._TOLINE != "")
                {
                    btnTo.Text = clsStatic._TOLINE + "(" + clsStatic._TOLINE_DESC + ")";
                }
                
            }
            else if (flag == "TO")
            {
                clsStatic._TOLINE = "";
                clsStatic._TOLINE_DESC = "";

                if (clsStatic._FROMLINE != "")
                {
                    btnFrom.Text = clsStatic._FROMLINE + "(" + clsStatic._FROMLINE_DESC + ")";
                }
            }

        }


        private void btnFrom_Click(object sender, EventArgs e)
        {
            if (_selectType == "재고이동" || _selectType == "공정이동" || _selectType == "대차재고이동" || _selectType == "원자재불출" || _selectType == "공정품불출" || _selectType == "Pallet구성")
            {
                clsStatic._resouceType = "FROM";
            }
            else if (_selectType == "간판라벨발행")
            {
                clsStatic._resouceType = "GANBAN";
            }
            clsStatic._dialogValue = "";
            frmCommonSelect frm = new frmCommonSelect(_selectType);
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                btnFrom.Text = clsStatic._dialogValue;
            }

            clsStatic._resouceType = "";
            clsStatic._dialogValue = "";



        }

        private void btnTo_Click(object sender, EventArgs e)
        {
            clsStatic._resouceType = "TO";
            clsStatic._dialogValue = "";
            frmCommonSelect frm = new frmCommonSelect(_selectType);
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                btnTo.Text = clsStatic._dialogValue;
            }

            clsStatic._resouceType = "";
            clsStatic._dialogValue = "";
        }

        private void btnItemType_Click(object sender, EventArgs e)
        {
            clsStatic._resouceType = "ITEMTYPE";
            clsStatic._dialogValue = "";
            frmCommonSelect frm = new frmCommonSelect(_selectType);
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                btnItemType.Text = clsStatic._dialogValue;
            }

            clsStatic._resouceType = "";
            clsStatic._dialogValue = "";
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void btnLogin_Click(object sender, EventArgs e)
        {
            if (btnFrom.Text == "NODATA" || btnTo.Text == "NODATA")
            {
                frmMessage frm1 = new frmMessage("Please select FROM line and TO line.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            if (btnFrom.Text == "NODATA" && _selectType == "간판라벨발행")
            {
                frmMessage frm1 = new frmMessage("Please select a current warehouse.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            clsStatic._LINEREMEMBER = clsStatic._FROMLINE + "^" + clsStatic._FROMLINE_DESC + "^" + clsStatic._TOLINE + "^" + clsStatic._TOLINE_DESC;

            clsLabelSet.setBCRPort();

            if (_selectType == "대차재고이동")
            {
                frmMainProductInput frm3 = new frmMainProductInput();
                frm3.ShowDialog();
                return;
            }

            if (_selectType == "재고이동" || _selectType == "공정이동")
            {
                //frmMoveProductProcess frm2 = new frmMoveProductProcess(btnFrom.Text, btnTo.Text, btnItemType.Text, _selectType, "");
                //frm2.ShowDialog();
                return;
            }

            if (_selectType == "자재입고")
            {
                frmMaterialGR frm3 = new frmMaterialGR();
                frm3.ShowDialog();
                return;
            }

            if (_selectType == "원자재불출")
            {
                frmMaterialGI frm3 = new frmMaterialGI();
                frm3.ShowDialog();
                return;
            }

            if (_selectType == "공정품불출")
            {
                frmMaterialGI frm3 = new frmMaterialGI();
                frm3.ShowDialog();
                return;
            }

            if (_selectType == "Pallet구성")
            {
                frmPallet frm3 = new frmPallet(btnFrom.Text, btnTo.Text, lblItemType.Text);
                frm3.ShowDialog();
                return;
            }
        }
    }
}
