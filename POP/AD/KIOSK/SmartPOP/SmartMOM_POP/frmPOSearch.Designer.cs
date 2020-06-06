﻿using System.Windows.Forms;

namespace SmartMOM_POP
{
    partial class frmPOSearch
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
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle4 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle5 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle6 = new System.Windows.Forms.DataGridViewCellStyle();
            this.tableLayoutPanel1 = new System.Windows.Forms.TableLayoutPanel();
            this.grdMain = new SmartMom_Lib.ExGrid();
            this.panel1 = new System.Windows.Forms.Panel();
            this.btnClose = new System.Windows.Forms.Button();
            this.btnDown = new System.Windows.Forms.Button();
            this.btnUp = new System.Windows.Forms.Button();
            this.panel2 = new System.Windows.Forms.Panel();
            this.btnDayafter = new System.Windows.Forms.Button();
            this.btnTodayFlag = new System.Windows.Forms.Button();
            this.btnMonthafter = new System.Windows.Forms.Button();
            this.btnMonthprev = new System.Windows.Forms.Button();
            this.btnDayprev = new System.Windows.Forms.Button();
            this.lblToday = new System.Windows.Forms.Label();
            this.btnOK = new System.Windows.Forms.Button();
            this.tableLayoutPanel1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.grdMain)).BeginInit();
            this.panel1.SuspendLayout();
            this.panel2.SuspendLayout();
            this.SuspendLayout();
            // 
            // tableLayoutPanel1
            // 
            this.tableLayoutPanel1.CellBorderStyle = System.Windows.Forms.TableLayoutPanelCellBorderStyle.Single;
            this.tableLayoutPanel1.ColumnCount = 1;
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.Controls.Add(this.grdMain, 0, 1);
            this.tableLayoutPanel1.Controls.Add(this.panel1, 0, 2);
            this.tableLayoutPanel1.Controls.Add(this.panel2, 0, 0);
            this.tableLayoutPanel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel1.Location = new System.Drawing.Point(0, 0);
            this.tableLayoutPanel1.Margin = new System.Windows.Forms.Padding(0);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 3;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 125F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 200F));
            this.tableLayoutPanel1.Size = new System.Drawing.Size(Screen.PrimaryScreen.Bounds.Width, Screen.PrimaryScreen.Bounds.Height);
            this.tableLayoutPanel1.TabIndex = 0;
            // 
            // grdMain
            // 
            this.grdMain.AllowUserToAddRows = false;
            this.grdMain.AllowUserToResizeRows = false;
            this.grdMain.BackgroundColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            this.grdMain.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.grdMain.CellBorderStyle = System.Windows.Forms.DataGridViewCellBorderStyle.None;
            this.grdMain.ColumnHeadersBorderStyle = System.Windows.Forms.DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle4.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle4.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle4.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle4.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle4.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle4.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle4.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.grdMain.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle4;
            this.grdMain.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.grdMain.Data = null;
            dataGridViewCellStyle5.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle5.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle5.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle5.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(136)))), ((int)(((byte)(136)))), ((int)(((byte)(136)))));
            dataGridViewCellStyle5.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle5.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle5.WrapMode = System.Windows.Forms.DataGridViewTriState.False;
            this.grdMain.DefaultCellStyle = dataGridViewCellStyle5;
            this.grdMain.Dock = System.Windows.Forms.DockStyle.Fill;
            this.grdMain.EditMode = System.Windows.Forms.DataGridViewEditMode.EditOnKeystroke;
            this.grdMain.EnableHeadersVisualStyles = false;
            this.grdMain.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            this.grdMain.GridColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            this.grdMain.LanguageCategory = null;
            this.grdMain.LanguageCode = null;
            this.grdMain.Location = new System.Drawing.Point(4, 130);
            this.grdMain.Name = "grdMain";
            this.grdMain.RowHeadersBorderStyle = System.Windows.Forms.DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle6.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle6.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle6.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle6.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle6.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle6.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle6.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.grdMain.RowHeadersDefaultCellStyle = dataGridViewCellStyle6;
            this.grdMain.RowHeadersVisible = false;
            this.grdMain.RowHeadersWidthSizeMode = System.Windows.Forms.DataGridViewRowHeadersWidthSizeMode.DisableResizing;
            this.grdMain.RowTemplate.Height = 23;
            this.grdMain.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.CellSelect;
            this.grdMain.Size = new System.Drawing.Size(1272, 689);
            this.grdMain.TabIndex = 0;
            this.grdMain.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.grdMain_CellClick);
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.btnClose);
            this.panel1.Controls.Add(this.btnDown);
            this.panel1.Controls.Add(this.btnUp);
            this.panel1.Controls.Add(this.btnOK);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel1.Location = new System.Drawing.Point(2, 824);
            this.panel1.Margin = new System.Windows.Forms.Padding(1);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(1276, 198);
            this.panel1.TabIndex = 1;
            // 
            // btnClose
            // 
            this.btnClose.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.btnClose.BackColor = System.Drawing.SystemColors.GradientActiveCaption;
            this.btnClose.Font = new System.Drawing.Font("맑은 고딕", 48F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnClose.Location = new System.Drawing.Point(979, 7);
            this.btnClose.Margin = new System.Windows.Forms.Padding(2);
            this.btnClose.Name = "btnClose";
            this.btnClose.Size = new System.Drawing.Size(293, 181);
            this.btnClose.TabIndex = 1;
            this.btnClose.Text = "닫기";
            this.btnClose.UseVisualStyleBackColor = false;
            this.btnClose.Click += new System.EventHandler(this.btnClose_Click);
            // 
            // btnDown
            // 
            this.btnDown.BackColor = System.Drawing.SystemColors.GradientActiveCaption;
            this.btnDown.Font = new System.Drawing.Font("맑은 고딕", 72F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnDown.Location = new System.Drawing.Point(296, 7);
            this.btnDown.Margin = new System.Windows.Forms.Padding(2);
            this.btnDown.Name = "btnDown";
            this.btnDown.Size = new System.Drawing.Size(288, 181);
            this.btnDown.TabIndex = 1;
            this.btnDown.Text = "▼";
            this.btnDown.UseVisualStyleBackColor = false;
            this.btnDown.Click += new System.EventHandler(this.btnDown_Click);
            // 
            // btnUp
            // 
            this.btnUp.BackColor = System.Drawing.SystemColors.GradientActiveCaption;
            this.btnUp.Font = new System.Drawing.Font("맑은 고딕", 72F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnUp.Location = new System.Drawing.Point(4, 7);
            this.btnUp.Margin = new System.Windows.Forms.Padding(2);
            this.btnUp.Name = "btnUp";
            this.btnUp.Size = new System.Drawing.Size(288, 181);
            this.btnUp.TabIndex = 1;
            this.btnUp.Text = "▲";
            this.btnUp.UseVisualStyleBackColor = false;
            this.btnUp.Click += new System.EventHandler(this.btnUp_Click);
            // 
            // panel2
            // 
            this.panel2.Controls.Add(this.btnDayafter);
            this.panel2.Controls.Add(this.btnTodayFlag);
            this.panel2.Controls.Add(this.btnMonthafter);
            this.panel2.Controls.Add(this.btnMonthprev);
            this.panel2.Controls.Add(this.btnDayprev);
            this.panel2.Controls.Add(this.lblToday);
            this.panel2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel2.Location = new System.Drawing.Point(2, 2);
            this.panel2.Margin = new System.Windows.Forms.Padding(1);
            this.panel2.Name = "panel2";
            this.panel2.Size = new System.Drawing.Size(1276, 123);
            this.panel2.TabIndex = 2;
            // 
            // btnDayafter
            // 
            this.btnDayafter.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Center;
            this.btnDayafter.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnDayafter.Font = new System.Drawing.Font("맑은 고딕", 48F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnDayafter.Location = new System.Drawing.Point(729, 10);
            this.btnDayafter.Name = "btnDayafter";
            this.btnDayafter.Size = new System.Drawing.Size(140, 100);
            this.btnDayafter.TabIndex = 3;
            this.btnDayafter.Text = ">";
            this.btnDayafter.UseVisualStyleBackColor = true;
            this.btnDayafter.Click += new System.EventHandler(this.btnDayafter_Click);
            // 
            // btnTodayFlag
            // 
            this.btnTodayFlag.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.btnTodayFlag.BackColor = System.Drawing.Color.Silver;
            this.btnTodayFlag.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Center;
            this.btnTodayFlag.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnTodayFlag.Font = new System.Drawing.Font("맑은 고딕", 36F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnTodayFlag.Location = new System.Drawing.Point(1024, 10);
            this.btnTodayFlag.Name = "btnTodayFlag";
            this.btnTodayFlag.Size = new System.Drawing.Size(247, 100);
            this.btnTodayFlag.TabIndex = 4;
            this.btnTodayFlag.Text = "오늘";
            this.btnTodayFlag.UseVisualStyleBackColor = false;
            this.btnTodayFlag.Click += new System.EventHandler(this.btnTodayFlag_Click);
            // 
            // btnMonthafter
            // 
            this.btnMonthafter.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Center;
            this.btnMonthafter.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnMonthafter.Font = new System.Drawing.Font("맑은 고딕", 48F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnMonthafter.Location = new System.Drawing.Point(873, 10);
            this.btnMonthafter.Name = "btnMonthafter";
            this.btnMonthafter.Size = new System.Drawing.Size(140, 100);
            this.btnMonthafter.TabIndex = 4;
            this.btnMonthafter.Text = ">>";
            this.btnMonthafter.UseVisualStyleBackColor = true;
            this.btnMonthafter.Click += new System.EventHandler(this.btnMonthafter_Click);
            // 
            // btnMonthprev
            // 
            this.btnMonthprev.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Center;
            this.btnMonthprev.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnMonthprev.Font = new System.Drawing.Font("맑은 고딕", 48F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnMonthprev.Location = new System.Drawing.Point(8, 10);
            this.btnMonthprev.Name = "btnMonthprev";
            this.btnMonthprev.Size = new System.Drawing.Size(140, 101);
            this.btnMonthprev.TabIndex = 5;
            this.btnMonthprev.Text = "<<";
            this.btnMonthprev.UseVisualStyleBackColor = true;
            this.btnMonthprev.Click += new System.EventHandler(this.btnMonthprev_Click);
            // 
            // btnDayprev
            // 
            this.btnDayprev.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Center;
            this.btnDayprev.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnDayprev.Font = new System.Drawing.Font("맑은 고딕", 48F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnDayprev.Location = new System.Drawing.Point(152, 10);
            this.btnDayprev.Name = "btnDayprev";
            this.btnDayprev.Size = new System.Drawing.Size(140, 101);
            this.btnDayprev.TabIndex = 6;
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
            this.lblToday.Location = new System.Drawing.Point(296, 10);
            this.lblToday.Name = "lblToday";
            this.lblToday.Size = new System.Drawing.Size(429, 101);
            this.lblToday.TabIndex = 2;
            this.lblToday.Text = "2018-10-11 목";
            this.lblToday.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.lblToday.Click += new System.EventHandler(this.lblToday_Click);
            // 
            // btnOK
            // 
            this.btnOK.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.btnOK.BackColor = System.Drawing.SystemColors.GradientActiveCaption;
            this.btnOK.Font = new System.Drawing.Font("맑은 고딕", 48F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnOK.Location = new System.Drawing.Point(682, 7);
            this.btnOK.Margin = new System.Windows.Forms.Padding(2);
            this.btnOK.Name = "btnOK";
            this.btnOK.Size = new System.Drawing.Size(293, 181);
            this.btnOK.TabIndex = 1;
            this.btnOK.Text = "선택";
            this.btnOK.UseVisualStyleBackColor = false;
            this.btnOK.Click += new System.EventHandler(this.btnOK_Click);
            // 
            // frmPOSearch
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(Screen.PrimaryScreen.Bounds.Width, Screen.PrimaryScreen.Bounds.Height);
            this.Controls.Add(this.tableLayoutPanel1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "frmPOSearch";
            this.Text = "작업지시 조회";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.FormClosed += new System.Windows.Forms.FormClosedEventHandler(this.frmPOSearch_FormClosed);
            this.tableLayoutPanel1.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.grdMain)).EndInit();
            this.panel1.ResumeLayout(false);
            this.panel2.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel1;
        private SmartMom_Lib.ExGrid grdMain;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Button btnClose;
        private System.Windows.Forms.Panel panel2;
        private System.Windows.Forms.Button btnDayafter;
        private System.Windows.Forms.Button btnMonthafter;
        private System.Windows.Forms.Button btnMonthprev;
        private System.Windows.Forms.Button btnDayprev;
        private System.Windows.Forms.Label lblToday;
        private System.Windows.Forms.Button btnTodayFlag;
        private System.Windows.Forms.Button btnDown;
        private System.Windows.Forms.Button btnUp;
        private System.Windows.Forms.Button btnOK;
    }
}