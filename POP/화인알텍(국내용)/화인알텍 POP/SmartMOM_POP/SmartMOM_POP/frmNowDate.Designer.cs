namespace SmartMOM_POP
{
    partial class frmNowDate
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.panel1 = new System.Windows.Forms.Panel();
            this.btnClose = new System.Windows.Forms.Button();
            this.btnConfirm = new System.Windows.Forms.Button();
            this.btnDayafter = new System.Windows.Forms.Button();
            this.btnMonthafter = new System.Windows.Forms.Button();
            this.btnMonthprev = new System.Windows.Forms.Button();
            this.btnDayprev = new System.Windows.Forms.Button();
            this.lblToday = new System.Windows.Forms.Label();
            this.panel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // panel1
            // 
            this.panel1.BackColor = System.Drawing.Color.White;
            this.panel1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.panel1.Controls.Add(this.btnClose);
            this.panel1.Controls.Add(this.btnConfirm);
            this.panel1.Controls.Add(this.btnDayafter);
            this.panel1.Controls.Add(this.btnMonthafter);
            this.panel1.Controls.Add(this.btnMonthprev);
            this.panel1.Controls.Add(this.btnDayprev);
            this.panel1.Controls.Add(this.lblToday);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel1.Location = new System.Drawing.Point(0, 0);
            this.panel1.Margin = new System.Windows.Forms.Padding(0);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(794, 363);
            this.panel1.TabIndex = 0;
            // 
            // btnClose
            // 
            this.btnClose.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.btnClose.BackColor = System.Drawing.Color.Silver;
            this.btnClose.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnClose.Font = new System.Drawing.Font("맑은 고딕", 36F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnClose.ForeColor = System.Drawing.Color.Black;
            this.btnClose.Location = new System.Drawing.Point(417, 224);
            this.btnClose.Margin = new System.Windows.Forms.Padding(0);
            this.btnClose.Name = "btnClose";
            this.btnClose.Size = new System.Drawing.Size(366, 129);
            this.btnClose.TabIndex = 12;
            this.btnClose.Text = "닫  기";
            this.btnClose.UseVisualStyleBackColor = false;
            this.btnClose.Click += new System.EventHandler(this.btnClose_Click);
            // 
            // btnConfirm
            // 
            this.btnConfirm.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.btnConfirm.BackColor = System.Drawing.Color.Silver;
            this.btnConfirm.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnConfirm.Font = new System.Drawing.Font("맑은 고딕", 36F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnConfirm.ForeColor = System.Drawing.Color.Black;
            this.btnConfirm.Location = new System.Drawing.Point(11, 224);
            this.btnConfirm.Margin = new System.Windows.Forms.Padding(0);
            this.btnConfirm.Name = "btnConfirm";
            this.btnConfirm.Size = new System.Drawing.Size(366, 129);
            this.btnConfirm.TabIndex = 12;
            this.btnConfirm.Text = "확  인";
            this.btnConfirm.UseVisualStyleBackColor = false;
            this.btnConfirm.Click += new System.EventHandler(this.btnConfirm_Click);
            // 
            // btnDayafter
            // 
            this.btnDayafter.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Center;
            this.btnDayafter.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnDayafter.Font = new System.Drawing.Font("맑은 고딕", 48F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnDayafter.Location = new System.Drawing.Point(417, 119);
            this.btnDayafter.Name = "btnDayafter";
            this.btnDayafter.Size = new System.Drawing.Size(180, 100);
            this.btnDayafter.TabIndex = 8;
            this.btnDayafter.Text = ">";
            this.btnDayafter.UseVisualStyleBackColor = true;
            this.btnDayafter.Click += new System.EventHandler(this.btnDayafter_Click);
            // 
            // btnMonthafter
            // 
            this.btnMonthafter.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Center;
            this.btnMonthafter.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnMonthafter.Font = new System.Drawing.Font("맑은 고딕", 48F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnMonthafter.Location = new System.Drawing.Point(603, 119);
            this.btnMonthafter.Name = "btnMonthafter";
            this.btnMonthafter.Size = new System.Drawing.Size(180, 100);
            this.btnMonthafter.TabIndex = 9;
            this.btnMonthafter.Text = ">>";
            this.btnMonthafter.UseVisualStyleBackColor = true;
            this.btnMonthafter.Click += new System.EventHandler(this.btnMonthafter_Click);
            // 
            // btnMonthprev
            // 
            this.btnMonthprev.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Center;
            this.btnMonthprev.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnMonthprev.Font = new System.Drawing.Font("맑은 고딕", 48F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnMonthprev.Location = new System.Drawing.Point(11, 119);
            this.btnMonthprev.Name = "btnMonthprev";
            this.btnMonthprev.Size = new System.Drawing.Size(180, 100);
            this.btnMonthprev.TabIndex = 10;
            this.btnMonthprev.Text = "<<";
            this.btnMonthprev.UseVisualStyleBackColor = true;
            this.btnMonthprev.Click += new System.EventHandler(this.btnMonthprev_Click);
            // 
            // btnDayprev
            // 
            this.btnDayprev.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Center;
            this.btnDayprev.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnDayprev.Font = new System.Drawing.Font("맑은 고딕", 48F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnDayprev.Location = new System.Drawing.Point(197, 119);
            this.btnDayprev.Name = "btnDayprev";
            this.btnDayprev.Size = new System.Drawing.Size(180, 100);
            this.btnDayprev.TabIndex = 11;
            this.btnDayprev.Text = "<";
            this.btnDayprev.UseVisualStyleBackColor = true;
            this.btnDayprev.Click += new System.EventHandler(this.btnDayprev_Click);
            // 
            // lblToday
            // 
            this.lblToday.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lblToday.Cursor = System.Windows.Forms.Cursors.Hand;
            this.lblToday.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.lblToday.Font = new System.Drawing.Font("맑은 고딕", 36F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblToday.Location = new System.Drawing.Point(11, 12);
            this.lblToday.Name = "lblToday";
            this.lblToday.Size = new System.Drawing.Size(772, 101);
            this.lblToday.TabIndex = 7;
            this.lblToday.Text = "2018-10-11 목";
            this.lblToday.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // frmNowDate
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(794, 363);
            this.Controls.Add(this.panel1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "frmNowDate";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "frmNowDate";
            this.panel1.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Button btnDayafter;
        private System.Windows.Forms.Button btnMonthafter;
        private System.Windows.Forms.Button btnMonthprev;
        private System.Windows.Forms.Button btnDayprev;
        private System.Windows.Forms.Label lblToday;
        private System.Windows.Forms.Button btnClose;
        private System.Windows.Forms.Button btnConfirm;
    }
}