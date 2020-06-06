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
        public frmStockType()
        {
            InitializeComponent();
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void btnMAT_Click(object sender, EventArgs e)
        {
            clsStatic._STOCK_TYPE = "MAT";
            clsStatic._STOCK_TYPE_NAME = btnMAT.Text;

            btnMAT.BackColor = Color.DodgerBlue;
            btnMRTN.BackColor = Color.Silver;
            btnWO.BackColor = Color.Silver;
            btnSO.BackColor = Color.Silver;
        }

        private void btnMRTN_Click(object sender, EventArgs e)
        {
            clsStatic._STOCK_TYPE = "MRTN";
            clsStatic._STOCK_TYPE_NAME = btnMRTN.Text;

            btnMAT.BackColor = Color.Silver;
            btnMRTN.BackColor = Color.DodgerBlue;
            btnWO.BackColor = Color.Silver;
            btnSO.BackColor = Color.Silver;
        }

        private void btnWO_Click(object sender, EventArgs e)
        {
            clsStatic._STOCK_TYPE = "WO";
            clsStatic._STOCK_TYPE_NAME = btnWO.Text;

            btnMAT.BackColor = Color.Silver;
            btnMRTN.BackColor = Color.Silver;
            btnWO.BackColor = Color.DodgerBlue;
            btnSO.BackColor = Color.Silver;
        }

        private void btnSO_Click(object sender, EventArgs e)
        {
            clsStatic._STOCK_TYPE = "SO";
            clsStatic._STOCK_TYPE_NAME = btnSO.Text;

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
            frmCommonStockSelect frm = new frmCommonStockSelect("공정이동");
            frm.ShowDialog();
            this.Close();
        }
    }
}
