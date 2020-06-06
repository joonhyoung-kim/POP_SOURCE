using SmartMom_Lib;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SmartMOM_POP
{
    public partial class frmNowDate : Form
    {
        string _now_date = "";

        public frmNowDate(string now_date)
        {
            InitializeComponent();

            DateTime dt = DateTime.Parse(now_date);
            CultureInfo cultures = CultureInfo.CreateSpecificCulture("ko-KR");
            lblToday.Text = dt.ToString(string.Format("yyyy-MM-dd ddd", cultures));
        }

        private void addMonths(int month)
        {
            string strDate = lblToday.Text;

            strDate = strDate.Split(' ')[0];

            DateTime dt = DateTime.Parse(strDate).AddMonths(month);

            _now_date = dt.ToString("yyyy-MM-dd");

            CultureInfo cultures = CultureInfo.CreateSpecificCulture("ko-KR");

            lblToday.Text = dt.ToString(string.Format("yyyy-MM-dd ddd", cultures));
        }

        private void addDays(int day)
        {
            string strDate = lblToday.Text;

            strDate = strDate.Split(' ')[0];

            DateTime dt = DateTime.Parse(strDate).AddDays(day);

            _now_date = dt.ToString("yyyy-MM-dd");

            CultureInfo cultures = CultureInfo.CreateSpecificCulture("ko-KR");

            lblToday.Text = dt.ToString(string.Format("yyyy-MM-dd ddd", cultures));

        }

        private void btnMonthprev_Click(object sender, EventArgs e)
        {
            addMonths(-1);
        }

        private void btnDayprev_Click(object sender, EventArgs e)
        {
            addDays(-1);

        }

        private void btnDayafter_Click(object sender, EventArgs e)
        {
            addDays(1);
        }

        private void btnMonthafter_Click(object sender, EventArgs e)
        {
            addMonths(1);
        }

        private void btnConfirm_Click(object sender, EventArgs e)
        {
            clsStatic._dialogValue = lblToday.Text;
            this.Close();
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }
    }
}
