namespace SmartMOM_POP
{
    partial class frmWMSProcess
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
            this.tableLayoutPanel1 = new System.Windows.Forms.TableLayoutPanel();
            this.btnMenuSelect = new System.Windows.Forms.Button();
            this.pnlMain = new System.Windows.Forms.Panel();
            this.btnClose = new System.Windows.Forms.Button();
            this.btnFromLoc = new System.Windows.Forms.Button();
            this.btnToLoc = new System.Windows.Forms.Button();
            this.comboOption = new System.Windows.Forms.ComboBox();
            this.tableLayoutPanel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // tableLayoutPanel1
            // 
            this.tableLayoutPanel1.CellBorderStyle = System.Windows.Forms.TableLayoutPanelCellBorderStyle.Single;
            this.tableLayoutPanel1.ColumnCount = 5;
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 25F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 25F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 25F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 25F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 150F));
            this.tableLayoutPanel1.Controls.Add(this.btnMenuSelect, 0, 0);
            this.tableLayoutPanel1.Controls.Add(this.pnlMain, 0, 1);
            this.tableLayoutPanel1.Controls.Add(this.btnClose, 4, 0);
            this.tableLayoutPanel1.Controls.Add(this.btnFromLoc, 2, 0);
            this.tableLayoutPanel1.Controls.Add(this.btnToLoc, 3, 0);
            this.tableLayoutPanel1.Controls.Add(this.comboOption, 1, 0);
            this.tableLayoutPanel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel1.Location = new System.Drawing.Point(0, 0);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 2;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 74F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.Size = new System.Drawing.Size(1024, 768);
            this.tableLayoutPanel1.TabIndex = 0;
            // 
            // btnMenuSelect
            // 
            this.btnMenuSelect.BackColor = System.Drawing.Color.Orange;
            this.btnMenuSelect.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnMenuSelect.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnMenuSelect.Font = new System.Drawing.Font("맑은 고딕", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnMenuSelect.ForeColor = System.Drawing.Color.Black;
            this.btnMenuSelect.Location = new System.Drawing.Point(1, 1);
            this.btnMenuSelect.Margin = new System.Windows.Forms.Padding(0);
            this.btnMenuSelect.Name = "btnMenuSelect";
            this.btnMenuSelect.Size = new System.Drawing.Size(217, 74);
            this.btnMenuSelect.TabIndex = 0;
            this.btnMenuSelect.Text = "화면 선택";
            this.btnMenuSelect.UseVisualStyleBackColor = false;
            this.btnMenuSelect.Click += new System.EventHandler(this.btnMenuSelect_Click);
            // 
            // pnlMain
            // 
            this.tableLayoutPanel1.SetColumnSpan(this.pnlMain, 5);
            this.pnlMain.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pnlMain.Location = new System.Drawing.Point(4, 79);
            this.pnlMain.Name = "pnlMain";
            this.pnlMain.Size = new System.Drawing.Size(1016, 685);
            this.pnlMain.TabIndex = 4;
            // 
            // btnClose
            // 
            this.btnClose.BackColor = System.Drawing.Color.Silver;
            this.btnClose.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnClose.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnClose.Font = new System.Drawing.Font("맑은 고딕", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnClose.ForeColor = System.Drawing.Color.Red;
            this.btnClose.Location = new System.Drawing.Point(873, 1);
            this.btnClose.Margin = new System.Windows.Forms.Padding(0);
            this.btnClose.Name = "btnClose";
            this.btnClose.Size = new System.Drawing.Size(150, 74);
            this.btnClose.TabIndex = 3;
            this.btnClose.Text = "닫기";
            this.btnClose.UseVisualStyleBackColor = false;
            this.btnClose.Click += new System.EventHandler(this.btnClose_Click);
            // 
            // btnFromLoc
            // 
            this.btnFromLoc.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnFromLoc.Font = new System.Drawing.Font("맑은 고딕", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnFromLoc.Location = new System.Drawing.Point(437, 1);
            this.btnFromLoc.Margin = new System.Windows.Forms.Padding(0);
            this.btnFromLoc.Name = "btnFromLoc";
            this.btnFromLoc.Size = new System.Drawing.Size(217, 74);
            this.btnFromLoc.TabIndex = 2;
            this.btnFromLoc.Text = "From : NoData";
            this.btnFromLoc.UseVisualStyleBackColor = true;
            this.btnFromLoc.Click += new System.EventHandler(this.btnFromLoc_Click);
            // 
            // btnToLoc
            // 
            this.btnToLoc.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnToLoc.Font = new System.Drawing.Font("맑은 고딕", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnToLoc.Location = new System.Drawing.Point(655, 1);
            this.btnToLoc.Margin = new System.Windows.Forms.Padding(0);
            this.btnToLoc.Name = "btnToLoc";
            this.btnToLoc.Size = new System.Drawing.Size(217, 74);
            this.btnToLoc.TabIndex = 3;
            this.btnToLoc.Text = "To : NoData";
            this.btnToLoc.UseVisualStyleBackColor = true;
            this.btnToLoc.Click += new System.EventHandler(this.btnToLoc_Click);
            // 
            // comboOption
            // 
            this.comboOption.BackColor = System.Drawing.Color.Silver;
            this.comboOption.Dock = System.Windows.Forms.DockStyle.Fill;
            this.comboOption.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboOption.Font = new System.Drawing.Font("맑은 고딕", 36F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.comboOption.FormattingEnabled = true;
            this.comboOption.Location = new System.Drawing.Point(219, 1);
            this.comboOption.Margin = new System.Windows.Forms.Padding(0);
            this.comboOption.MaxDropDownItems = 4;
            this.comboOption.Name = "comboOption";
            this.comboOption.Size = new System.Drawing.Size(217, 73);
            this.comboOption.TabIndex = 1;
            this.comboOption.SelectedIndexChanged += new System.EventHandler(this.comboOption_SelectedIndexChanged);
            // 
            // frmWMSProcess
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1024, 768);
            this.Controls.Add(this.tableLayoutPanel1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "frmWMSProcess";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "공정이동";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.tableLayoutPanel1.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel1;
        private System.Windows.Forms.Button btnClose;
        private System.Windows.Forms.Panel pnlMain;
        private System.Windows.Forms.Button btnMenuSelect;
        private System.Windows.Forms.Button btnFromLoc;
        private System.Windows.Forms.Button btnToLoc;
        private System.Windows.Forms.ComboBox comboOption;
    }
}