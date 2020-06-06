using MetroFramework.Forms;
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
    public partial class frmLoginIDInsert : Form
    {
        string _initFlag = "Y";
        public frmLoginIDInsert()
        {
            InitializeComponent();
        }

        public frmLoginIDInsert(string value)
        {
            InitializeComponent();

            txtID.Text = value;
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void btn_Click(object sender, EventArgs e)
        {
            string value = ((Button)sender).Text;

            if (_initFlag == "Y")
            {
                txtID.Text = value;
                _initFlag = "N";
            }
            else
            {
                txtID.Text += value;
            }
        }

        private void btnBack_Click(object sender, EventArgs e)
        {
            if(txtID.Text.Trim() == "")
            {
                return;
            }

            txtID.Text = txtID.Text.Substring(0, txtID.Text.Length - 1);
        }

        private void metroButton10_Click(object sender, EventArgs e)
        {
            if (txtID.Text.Trim() == "")
            {
                this.Close();
            }

            clsStatic._dialogValue = int.Parse(txtID.Text.Trim()).ToString();
            this.Close();
        }

        private void btnInit_Click(object sender, EventArgs e)
        {
            txtID.Text = "";
        }
    }
}
