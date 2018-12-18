namespace generator_parcare
{
    partial class Form1
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
            this.btn_generare = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.txt_locatie = new System.Windows.Forms.TextBox();
            this.nr_total_locuri = new System.Windows.Forms.NumericUpDown();
            this.label2 = new System.Windows.Forms.Label();
            this.gb_adauga_parcare = new System.Windows.Forms.GroupBox();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.txt_id_parcare = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.btn_update_locuri = new System.Windows.Forms.Button();
            this.nr_total_locuri_regenerare = new System.Windows.Forms.NumericUpDown();
            this.label4 = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.nr_total_locuri)).BeginInit();
            this.gb_adauga_parcare.SuspendLayout();
            this.groupBox1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.nr_total_locuri_regenerare)).BeginInit();
            this.SuspendLayout();
            // 
            // btn_generare
            // 
            this.btn_generare.Location = new System.Drawing.Point(11, 106);
            this.btn_generare.Name = "btn_generare";
            this.btn_generare.Size = new System.Drawing.Size(197, 27);
            this.btn_generare.TabIndex = 0;
            this.btn_generare.Text = "Adauga si genereaza locuri";
            this.btn_generare.UseVisualStyleBackColor = true;
            this.btn_generare.Click += new System.EventHandler(this.btn_generare_Click);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(8, 20);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(81, 13);
            this.label1.TabIndex = 1;
            this.label1.Text = "Locatie parcare";
            // 
            // txt_locatie
            // 
            this.txt_locatie.Location = new System.Drawing.Point(11, 36);
            this.txt_locatie.Name = "txt_locatie";
            this.txt_locatie.Size = new System.Drawing.Size(197, 20);
            this.txt_locatie.TabIndex = 2;
            // 
            // nr_total_locuri
            // 
            this.nr_total_locuri.Location = new System.Drawing.Point(11, 80);
            this.nr_total_locuri.Name = "nr_total_locuri";
            this.nr_total_locuri.Size = new System.Drawing.Size(197, 20);
            this.nr_total_locuri.TabIndex = 3;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(8, 64);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(104, 13);
            this.label2.TabIndex = 4;
            this.label2.Text = "Numar total de locuri";
            // 
            // gb_adauga_parcare
            // 
            this.gb_adauga_parcare.Controls.Add(this.txt_locatie);
            this.gb_adauga_parcare.Controls.Add(this.label2);
            this.gb_adauga_parcare.Controls.Add(this.btn_generare);
            this.gb_adauga_parcare.Controls.Add(this.nr_total_locuri);
            this.gb_adauga_parcare.Controls.Add(this.label1);
            this.gb_adauga_parcare.Location = new System.Drawing.Point(12, 12);
            this.gb_adauga_parcare.Name = "gb_adauga_parcare";
            this.gb_adauga_parcare.Size = new System.Drawing.Size(220, 144);
            this.gb_adauga_parcare.TabIndex = 5;
            this.gb_adauga_parcare.TabStop = false;
            this.gb_adauga_parcare.Text = "Adauga Parcare";
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.txt_id_parcare);
            this.groupBox1.Controls.Add(this.label3);
            this.groupBox1.Controls.Add(this.btn_update_locuri);
            this.groupBox1.Controls.Add(this.nr_total_locuri_regenerare);
            this.groupBox1.Controls.Add(this.label4);
            this.groupBox1.Location = new System.Drawing.Point(243, 12);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(220, 144);
            this.groupBox1.TabIndex = 6;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Regenereaza locuri la o parcare existenta";
            // 
            // txt_id_parcare
            // 
            this.txt_id_parcare.Location = new System.Drawing.Point(11, 36);
            this.txt_id_parcare.Name = "txt_id_parcare";
            this.txt_id_parcare.Size = new System.Drawing.Size(197, 20);
            this.txt_id_parcare.TabIndex = 2;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(8, 64);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(81, 13);
            this.label3.TabIndex = 4;
            this.label3.Text = "Numar de locuri";
            // 
            // btn_update_locuri
            // 
            this.btn_update_locuri.Location = new System.Drawing.Point(11, 106);
            this.btn_update_locuri.Name = "btn_update_locuri";
            this.btn_update_locuri.Size = new System.Drawing.Size(197, 27);
            this.btn_update_locuri.TabIndex = 0;
            this.btn_update_locuri.Text = "Update - Genereaza locuri";
            this.btn_update_locuri.UseVisualStyleBackColor = true;
            this.btn_update_locuri.Click += new System.EventHandler(this.btn_update_locuri_Click);
            // 
            // nr_total_locuri_regenerare
            // 
            this.nr_total_locuri_regenerare.Location = new System.Drawing.Point(11, 80);
            this.nr_total_locuri_regenerare.Name = "nr_total_locuri_regenerare";
            this.nr_total_locuri_regenerare.Size = new System.Drawing.Size(197, 20);
            this.nr_total_locuri_regenerare.TabIndex = 3;
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(8, 20);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(102, 13);
            this.label4.TabIndex = 1;
            this.label4.Text = "Identificator Parcare";
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(475, 167);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.gb_adauga_parcare);
            this.Name = "Form1";
            this.Text = "Form1";
            this.Load += new System.EventHandler(this.Form1_Load);
            ((System.ComponentModel.ISupportInitialize)(this.nr_total_locuri)).EndInit();
            this.gb_adauga_parcare.ResumeLayout(false);
            this.gb_adauga_parcare.PerformLayout();
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.nr_total_locuri_regenerare)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button btn_generare;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox txt_locatie;
        private System.Windows.Forms.NumericUpDown nr_total_locuri;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.GroupBox gb_adauga_parcare;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.TextBox txt_id_parcare;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Button btn_update_locuri;
        private System.Windows.Forms.NumericUpDown nr_total_locuri_regenerare;
        private System.Windows.Forms.Label label4;
    }
}

