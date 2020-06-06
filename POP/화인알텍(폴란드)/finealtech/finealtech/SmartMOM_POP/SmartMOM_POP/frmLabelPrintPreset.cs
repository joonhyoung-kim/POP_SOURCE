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
    public partial class frmLabelPrintPreset : Form
    {
        string incttype = "";

        public frmLabelPrintPreset()
        {
            InitializeComponent();
            txtXposition.Text = clsStatic._XPOSITION;
            txtYposition.Text = clsStatic._YPOSITION;
        }

        private void btnConfirm_Click(object sender, EventArgs e)
        {
            if (txtXposition.Text == "" || txtYposition.Text == "")
            {
                frmMessage frm1 = new frmMessage("Please check the X_POSITION / Y_POSITION values.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            } else
            {
                clsStatic._XPOSITION = txtXposition.Text;
                clsStatic._YPOSITION = txtYposition.Text;
                bcrremember();
                this.Close();
            }
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void bcrremember()
        {
           clsStatic._LOGINREMEMBER = clsStatic._USER_ID + "^" + clsStatic._USER_NAME + "^" + clsStatic._RESOURCE_CD + "^" + clsStatic._RESOURCE_TEXT + "^" + clsStatic._MANAGER_YN + "^" + clsStatic._XPOSITION + "^" + clsStatic._YPOSITION;
           
            clsLabelSet.setBCRPort();
        }
    }
}
