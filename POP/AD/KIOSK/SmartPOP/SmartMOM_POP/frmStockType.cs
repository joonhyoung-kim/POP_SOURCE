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
    public partial class frmStockType : Form
    {
        string _type = "";

        public frmStockType(string type)
        {
            _type = type;
            InitializeComponent();

            if(_type == "재고현황")
            {
                btnMAT.Text = "자재창고";
                btnMRTN.Text = "생산창고";
                btnWO.Text = "생산/외주창고";
                btnSO.Text = "생산/영업창고";
            }
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void btnMAT_Click(object sender, EventArgs e)
        {
            clsStatic._STOCK_TYPE = "MAT";

            btnMAT.BackColor = Color.DodgerBlue;
            btnMRTN.BackColor = Color.Silver;
            btnWO.BackColor = Color.Silver;
            btnSO.BackColor = Color.Silver;
        }

        private void btnMRTN_Click(object sender, EventArgs e)
        {
            clsStatic._STOCK_TYPE = "MRTN";

            btnMAT.BackColor = Color.Silver;
            btnMRTN.BackColor = Color.DodgerBlue;
            btnWO.BackColor = Color.Silver;
            btnSO.BackColor = Color.Silver;
        }

        private void btnWO_Click(object sender, EventArgs e)
        {
            clsStatic._STOCK_TYPE = "WO";

            btnMAT.BackColor = Color.Silver;
            btnMRTN.BackColor = Color.Silver;
            btnWO.BackColor = Color.DodgerBlue;
            btnSO.BackColor = Color.Silver;
        }

        private void btnSO_Click(object sender, EventArgs e)
        {
            clsStatic._STOCK_TYPE = "SO";

            btnMAT.BackColor = Color.Silver;
            btnMRTN.BackColor = Color.Silver;
            btnWO.BackColor = Color.Silver;
            btnSO.BackColor = Color.DodgerBlue;

        }

        private void btnConfirm_Click(object sender, EventArgs e)
        {
            if(clsStatic._STOCK_TYPE == "")
            {
                frmMessage frm1 = new frmMessage("이동형태를 선택하여 주세요!", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            frmCommonStockSelect frm = new frmCommonStockSelect(_type);
            frm.ShowDialog();
        }
    }
}
