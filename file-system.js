// File System Structure - Genetist Scientist Workspace

const fileSystem = {
    '/home/gema/workspace': {
        type: 'folder',
        children: {
            'projects': {
                type: 'folder',
                children: {
                    'genome-analysis': {
                        type: 'folder',
                        children: {
                            'README.md': {
                                type: 'file',
                                content: `# Proyecto: Análisis del Genoma

## Descripción
Investigación avanzada en análisis genómico utilizando herramientas bioinformáticas.

## Objetivos
- Secuenciación de genomas completos
- Análisis de variantes genéticas
- Identificación de polimorfismos
- Estudios de expresión génica

## Metodología
1. Extracción de ADN de muestras biológicas
2. Preparación de librerías para secuenciación
3. Análisis bioinformático de lecturas
4. Validación de resultados

## Resultados Clave
- 250,000 variantes identificadas
- 15 polimorfismos de interés clínico
- Concordancia del 99.8% en validación`
                            },
                            'data': {
                                type: 'folder',
                                children: {
                                    'sequences.fasta': {
                                        type: 'file',
                                        content: `>Homo_sapiens_chromosome_1
ATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG
ATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG
ATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG

>Homo_sapiens_chromosome_2
GCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTA
GCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTA
GCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTA

>Homo_sapiens_chromosome_3
TTAATTAATTAATTAATTAATTAATTAATTAATTAATTAA
TTAATTAATTAATTAATTAATTAATTAATTAATTAATTAA
TTAATTAATTAATTAATTAATTAATTAATTAATTAATTAA`
                                    },
                                    'variants.vcf': {
                                        type: 'file',
                                        content: `##fileformat=VCFv4.2
##INFO=<ID=DP,Number=1,Type=Integer,Description="Read depth">
##INFO=<ID=AF,Number=A,Type=Float,Description="Allele Frequency">
#CHROM	POS	ID	REF	ALT	QUAL	FILTER	INFO
chr1	100000	rs12345	A	G	60	PASS	DP=100;AF=0.5
chr1	250000	rs12346	C	T	85	PASS	DP=150;AF=0.75
chr2	500000	.	G	A	90	PASS	DP=200;AF=0.25
chr3	1000000	rs12347	T	G	100	PASS	DP=250;AF=0.95`
                                    },
                                    'metrics.tsv': {
                                        type: 'file',
                                        content: `Sample\tTotal_Reads\tMapped_Reads\tCoverage\tGC_Content
Sample_001\t50000000\t49500000\t98.5\t0.42
Sample_002\t45000000\t44550000\t97.8\t0.41
Sample_003\t55000000\t54450000\t99.0\t0.43
Sample_004\t48000000\t47520000\t98.0\t0.42`
                                    }
                                }
                            },
                            'analysis.py': {
                                type: 'file',
                                content: `#!/usr/bin/env python3
"""
Genomic Analysis Pipeline
Análisis de secuencias genómicas y detección de variantes
"""

import sys
from collections import defaultdict

def read_fasta(filename):
    """Lee archivo FASTA"""
    sequences = {}
    current_header = None
    current_seq = []
    
    with open(filename, 'r') as f:
        for line in f:
            if line.startswith('>'):
                if current_header:
                    sequences[current_header] = ''.join(current_seq)
                current_header = line[1:].strip()
                current_seq = []
            else:
                current_seq.append(line.strip())
    
    if current_header:
        sequences[current_header] = ''.join(current_seq)
    return sequences

def calculate_gc_content(sequence):
    """Calcula contenido GC"""
    gc_count = sequence.upper().count('G') + sequence.upper().count('C')
    return round(gc_count / len(sequence), 4) if sequence else 0

def find_variants(ref_seq, query_seq):
    """Identifica variantes entre secuencias"""
    variants = []
    for i, (r, q) in enumerate(zip(ref_seq, query_seq)):
        if r != q:
            variants.append({'pos': i, 'ref': r, 'alt': q})
    return variants

if __name__ == '__main__':
    print("Genome Analysis Pipeline iniciado...")`
                            }
                        }
                    },
                    'proteomics-study': {
                        type: 'folder',
                        children: {
                            'README.md': {
                                type: 'file',
                                content: `# Proyecto: Estudio Proteómico

## Objetivo Principal
Identificación y cuantificación de proteínas expresadas en diferentes tejidos.

## Métodos
- Espectrometría de masas LC-MS/MS
- Electroforesis 2D
- Western Blotting
- Inmunoprecipitación

## Muestras Analizadas
- Tejido cerebral (n=10)
- Tejido muscular (n=10)
- Tejido cardíaco (n=10)

## Proteínas Significativas Encontradas
- HSP70 (Heat Shock Protein)
- CTCF (CCCTC-binding factor)
- TP53 (Proteína supresora tumoral)
- BRCA1 (Proteína de reparación del ADN)`
                            },
                            'protein_list.csv': {
                                type: 'file',
                                content: `Protein_Name,Gene_ID,Tissue,Expression_Level,MW_kDa,Abundance
Heat Shock Protein 70,ENSG00000109906,Brain,High,70.4,1.2e-4
Tumor Suppressor p53,ENSG00000141510,Muscle,Medium,53.7,8.5e-5
DNA Repair Protein BRCA1,ENSG00000012048,Heart,Low,207.3,3.2e-5
CCCTC-Binding Factor,ENSG00000102974,Brain,Very High,82.3,2.1e-4
Myosin Heavy Chain,ENSG00000092054,Muscle,Very High,223.6,3.5e-4
Troponin C,ENSG00000102182,Heart,High,18.4,1.8e-4`
                            }
                        }
                    }
                }
            },
            'research-notes': {
                type: 'folder',
                children: {
                    'journal-2025.txt': {
                        type: 'file',
                        content: `DIARIO DE INVESTIGACIÓN - AÑO 2025

Enero 2025:
- Iniciado análisis de 500 muestras de genoma completo
- Implementación de nuevo pipeline bioinformático
- Primera reunión del equipo de investigación

Febrero 2025:
- Descubrimiento de 3 variantes novedosas
- Resultados preliminares prometedores
- Aumento en la cobertura de secuenciación

Marzo 2025:
- Validación de variantes mediante Sanger
- Publicación de artículo en pre-print
- Colaboración con laboratorios internacionales

Abril 2025:
- Análisis de correlación fenotipo-genotipo
- Estudios funcionales en marcha
- Presentación en conferencia internacional

Mayo 2025:
- Análisis transcriptómico complementario
- Investigación de mecanismos moleculares
- Preparación de manuscrito para revisión`
                    },
                    'methodology': {
                        type: 'folder',
                        children: {
                            'sampling-protocol.md': {
                                type: 'file',
                                content: `# Protocolo de Muestreo

## Criterios de Inclusión
- Edad 18-70 años
- Sin antecedentes de enfermedades genéticas conocidas
- Consentimiento informado escrito

## Procedimiento de Extracción
1. Esterilización del sitio de punción
2. Extracción de 10mL de sangre en tubo EDTA
3. Etiquetado inmediato de muestras
4. Refrigeración a 4°C

## Almacenamiento
- Temperatura: -20°C a -80°C
- Duración: Hasta 10 años
- Localización: Banco de muestras certificado

## Control de Calidad
- Verificación de volumen
- Control de contaminación
- Documentación fotográfica
- Base de datos de seguimiento`
                            },
                            'quality-standards.txt': {
                                type: 'file',
                                content: `ESTÁNDARES DE CALIDAD - LABORATORIO GENÓMICO

ISO Certifications:
- ISO 9001:2015 - Gestión de Calidad
- ISO 13485:2016 - Dispositivos Médicos
- ISO 17025:2017 - Competencia Técnica

Parámetros de Control:
- Pureza ADN: OD260/280 > 1.8
- Pureza ADN: OD260/230 > 2.0
- Concentración mínima: 50 ng/μL
- Integridad de ADN: RIN > 7

Validación de Equipos:
- Secuenciador Illumina NextSeq 550
- Espectrometría de masas Orbitrap
- Microscopio de fluorescencia Zeiss
- PCR en tiempo real qPCR Applied Biosystems`
                            }
                        }
                    }
                }
            },
            'publications': {
                type: 'folder',
                children: {
                    '2024-genome-variants.pdf': {
                        type: 'file',
                        content: `[Documento PDF: Identificación de Variantes Genómicas Noveles]
Autores: Gema R., et al.
Revista: Nature Genetics
DOI: 10.1038/ng.xxxxx

Resumen:
Este estudio presenta el análisis de 500 genomas completos...`
                    },
                    '2024-protein-expression.pdf': {
                        type: 'file',
                        content: `[Documento PDF: Patrones de Expresión Proteica en Tejidos]
Autores: Gema R., et al.
Revista: Journal of Proteome Research
DOI: 10.1021/acs.jproteome.xxxxx

Resumen:
La proteómica ha revelado patrones únicos de expresión...`
                    }
                }
            },
            'bioinformatics-tools': {
                type: 'folder',
                children: {
                    'alignment-tool.sh': {
                        type: 'file',
                        content: `#!/bin/bash
# Herramienta de Alineamiento de Secuencias
# Uso: ./alignment-tool.sh <referencia> <query>

if [ $# -lt 2 ]; then
    echo "Uso: $0 <archivo_referencia.fasta> <archivo_query.fasta>"
    exit 1
fi

REF=$1
QUERY=$2
OUTPUT="\${QUERY%.fasta}_aligned.sam"

echo "[*] Iniciando alineamiento..."
echo "[*] Referencia: $REF"
echo "[*] Query: $QUERY"

# Ejecutar bwa
bwa mem -a $REF $QUERY > $OUTPUT

echo "[+] Alineamiento completado: $OUTPUT"

# Estadísticas
samtools flagstat $OUTPUT > "\${OUTPUT%.sam}_stats.txt"
echo "[+] Estadísticas guardadas"`
                    },
                    'variant-caller.py': {
                        type: 'file',
                        content: `#!/usr/bin/env python3
"""
Variant Caller - Detección de Variantes Genéticas
Compara secuencias y genera archivo VCF
"""

import argparse
from datetime import datetime

class VariantCaller:
    def __init__(self, ref_file, sample_file):
        self.ref_file = ref_file
        self.sample_file = sample_file
        self.variants = []
    
    def call_variants(self):
        """Detección de variantes"""
        print("[*] Leyendo archivos...")
        
    def write_vcf(self, output_file):
        """Escribe resultados en formato VCF"""
        print(f"[+] VCF escrito en {output_file}")

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('reference')
    parser.add_argument('sample')
    args = parser.parse_args()
    
    caller = VariantCaller(args.reference, args.sample)
    caller.call_variants()`
                    }
                }
            },
            'system-info.txt': {
                type: 'file',
                content: `┌─────────────────────────────────────────┐
│  Espacio de Trabajo de Gema R.          │
│  Laboratorio de Genómica Científica      │
└─────────────────────────────────────────┘

Sistema Operativo: Linux Genome Workstation v5.10
Procesador: Intel Xeon W-2295 (36 cores)
RAM: 512 GB DDR4
Almacenamiento: 50 TB RAID SSD

Herramientas Instaladas:
- GATK v4.2.6 (Análisis Genómico)
- BWA v0.7.17 (Alineamiento)
- SAMtools v1.15 (Procesamiento BAM/SAM)
- BLAST v2.12 (Búsqueda de Secuencias)
- RStudio v2024.04 (Análisis Estadístico)
- Python v3.11 con BioPython, NumPy, Pandas
- QIIME 2 (Análisis de Microbiomas)

Bases de Datos:
- dbSNP (Polimorfismos conocidos)
- ClinVar (Variantes Clínicas)
- RefSeq (Genomas de Referencia)
- UniProt (Información de Proteínas)

Última Actualización: 2025-05-24
Tiempo de Funcionamiento: 127 días
Estado del Sistema: OPERACIONAL ✓`
            }
        }
    }
};

// Clase para gestionar el sistema de archivos virtual
class FileSystemManager {
    constructor(fileSystem) {
        this.fileSystem = fileSystem;
        this.currentPath = '/home/gema/workspace';
        this.history = [this.currentPath];
    }

    getCurrentFolder() {
        const parts = this.currentPath.split('/').filter(p => p);
        let current = this.fileSystem['/home/gema/workspace'];

        for (const part of parts.slice(4)) { // Skip /home/gema/workspace
            if (current.children && current.children[part]) {
                current = current.children[part];
            } else {
                return null;
            }
        }

        return current;
    }

    getPathContents() {
        const current = this.getCurrentFolder();
        if (!current) return null;

        if (current.type === 'folder' && current.children) {
            return current.children;
        }
        return null;
    }

    navigateTo(target) {
        if (target === '..') {
            const parts = this.currentPath.split('/').filter(p => p);
            if (parts.length > 3) { // Don't go above workspace
                parts.pop();
                this.currentPath = '/' + parts.join('/');
                return true;
            }
            return false;
        }

        const contents = this.getPathContents();
        if (contents && contents[target]) {
            this.currentPath += '/' + target;
            this.history.push(this.currentPath);
            return true;
        }
        return false;
    }

    getFile(filename) {
        const contents = this.getPathContents();
        if (contents && contents[filename] && contents[filename].type === 'file') {
            return contents[filename];
        }
        return null;
    }

    getPathDisplay() {
        return this.currentPath;
    }
}

// Crear instancia global del gestor de archivos
const fsManager = new FileSystemManager(fileSystem);
