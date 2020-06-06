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
    public partial class frmWorkType : Form
    {
        public frmWorkType()
        {
            InitializeComponent();
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void btnID_Click(object sender, EventArgs e)
        {
            clsStatic._dialogValue = "ID Scan";
            this.Close();
        }

        private void btnGanban_Click(object sender, EventArgs e)
        {
            clsStatic._dialogValue = "Ganban Scan";
            this.Close();
        }
    }
}
